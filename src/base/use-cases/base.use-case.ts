import { Connection, QueryRunner } from 'typeorm';
import { QR } from '../queryRunner';

export abstract class BaseUseCase<Entity> {
  queryRunner: QueryRunner;
  entity: Entity;

  constructor(private connection: Connection) {}

  async execute(): Promise<void> {
    this.queryRunner = await QR.startTransaction(this.connection);
    try {
      await this.prepareData();
      await this.beforeProcess();
      await this.process();
      await this.afterProcess();
      await this.queryRunner.commitTransaction();
    } catch (e) {
      await this.queryRunner.rollbackTransaction();
      throw new Error(e.message);
    } finally {
      await this.queryRunner.release();
    }
  }

  abstract prepareData(): Promise<void>;

  abstract beforeProcess(): Promise<void>;

  abstract process(): Promise<void>;

  abstract afterProcess(): Promise<void>;
}
