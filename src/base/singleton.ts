export interface IUserSingleton {
  user_id: string;
  email: string;
}

export class Singleton {
  user: IUserSingleton;
  private static instance: Singleton;

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public set(data: { user: IUserSingleton }) {
    this.user = data.user;
  }

  public getUser(): IUserSingleton {
    return this.user;
  }
}
