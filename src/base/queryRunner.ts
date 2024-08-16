import { Connection, QueryRunner } from 'typeorm';

export class QR {
  static async startTransaction(connection: Connection): Promise<QueryRunner> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.startTransaction();
    return queryRunner;
  }
}
