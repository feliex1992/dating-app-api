import { BaseCreateUseCase } from 'src/base/use-cases/process/base-create.use-case';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUserProfile } from '../interface/user-profile.interface';
import { AuthRepository } from '../../data/auth.repository';
import { UserProfile } from '../../data/entities/user-profile.entity';

export class UserProfileCreate extends BaseCreateUseCase<IUserProfile> {
  constructor(
    connection: Connection,
    private authRepository: AuthRepository,
    private userProfileEntity: IUserProfile,
  ) {
    super(connection, authRepository, UserProfile, userProfileEntity);
  }

  async beforeProcess(): Promise<void> {
    if (
      this.userProfileEntity.retype_password !== this.userProfileEntity.password
    ) throw new Error('password and retype password is not match!');

    const userData = await this.authRepository.getOne({
      where: { email: this.userProfileEntity.email },
    });

    if (userData) throw new Error('email is already registered!');

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.userProfileEntity.password, salt);

    this.userProfileEntity.password = hash;
  }

  async getResultSignup(): Promise<IUserProfile> {
    const result = await this.getResult();

    if (result.password) delete result.password;
    return result;
  }
}
