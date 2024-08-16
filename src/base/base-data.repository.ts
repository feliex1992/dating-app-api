import {
  EntityTarget,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseDataRepository<Entity> {
  tableName: string;
  relations: string[];

  constructor(public repository: Repository<Entity>) {}

  getRepository() {
    return this.repository;
  }

  getRelations() {
    return this.relations;
  }

  getTableName() {
    return this.tableName;
  }

  async createData(
    queryRunner: QueryRunner,
    entityTarget: EntityTarget<Entity>,
    entity: Entity,
  ): Promise<Entity> {
    const newEntity = queryRunner.manager.create(entityTarget, entity);
    return await queryRunner.manager.save(newEntity);
  }

  async updateData(
    queryRunner: QueryRunner,
    entityTarget: EntityTarget<Entity>,
    filterUpdate: any,
    entity: QueryDeepPartialEntity<Entity>,
  ): Promise<void> {
    await queryRunner.manager.update(entityTarget, filterUpdate, entity);
  }

  async updateDataById(
    queryRunner: QueryRunner,
    entityTarget: EntityTarget<Entity>,
    id: string,
    updatedData: Entity,
  ): Promise<Entity> {
    const findOption: any = { id: id };
    const entity: Entity = await queryRunner.manager.findOneBy(
      entityTarget,
      findOption,
    );
    if (!entity) throw new Error('Data not found!');
    Object.assign(entity, updatedData);
    await queryRunner.manager.save(entity);
    return entity;
  }

  async getMany(
    queryBuilder: SelectQueryBuilder<Entity>,
    options: IPaginationOptions,
  ): Promise<Pagination<Entity>> {
    return await paginate<Entity>(queryBuilder, options);
  }

  async getOne(findOneOptions): Promise<Entity> {
    findOneOptions.relations = this.relations;
    return await this.repository.findOne(findOneOptions);
  }

  async deleteDataById(
    queryRunner: QueryRunner,
    entityTarget: EntityTarget<Entity>,
    id: string,
  ): Promise<void> {
    await queryRunner.manager.delete(entityTarget, { id });
  }
}
