export abstract class BaseReadUseCase {
  table_name: string;

  async execute(): Promise<void> {
    await this.beforeProcess();
    await this.process();
    await this.afterProcess();
  }

  abstract beforeProcess(): Promise<void>;

  abstract process(): Promise<void>;

  abstract afterProcess(): Promise<void>;
}
