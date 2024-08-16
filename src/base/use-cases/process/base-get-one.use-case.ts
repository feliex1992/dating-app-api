import { BaseDataRepository } from 'src/base/base-data.repository';
import { BaseReadUseCase } from '../base-read.use-case';

export abstract class BaseGetOneUseCase<Entity> extends BaseReadUseCase {
  result: Entity;

  constructor(public dataRepository: BaseDataRepository<Entity>) {
    super();
  }

  abstract beforeProcess(): Promise<void>;

  async process(): Promise<void> {
    let findProperties = {};
    findProperties = await this.setFindProperties();

    const data = await this.dataRepository.getOne(findProperties);
    if (!data) throw new Error('Data tidak di temukan!');
    this.result = data;
  }

  abstract setFindProperties(): Promise<any>;

  abstract afterProcess(): Promise<void>;

  getResult(): Entity {
    return this.result;
  }
}
