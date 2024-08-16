import { IUserProfile } from 'src/module/auth/domain/interface/user-profile.interface';
import { ProfileRepository } from '../../data/profile.repository';
import { BaseCreateUseCase } from 'src/base/use-cases/process/base-create.use-case';
import { Connection } from 'typeorm';
import { UserProfile } from 'src/module/auth/data/entities/user-profile.entity';
import { PremiumType } from 'src/base/constants';

export class ProfileBrowse extends BaseCreateUseCase<IUserProfile> {
  constructor(
    connection: Connection,
    private profileRepository: ProfileRepository,
    private userProfileEntity: IUserProfile,
  ) {
    super(connection, profileRepository, UserProfile, userProfileEntity);
  }

  async beforeProcess(): Promise<void> {}

  async setFindProperties(): Promise<any> {}

  async process(): Promise<void> {
    this.result = await this.profileRepository.browseProfile(
      this.userProfileEntity.user_id,
      this.userProfileEntity.user_id
    );
  }

  async afterProcess(): Promise<void> {}

  getResultBrowse() {
    return this.result;
  }
}
