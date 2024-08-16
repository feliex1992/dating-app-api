import { IUserProfile } from 'src/module/auth/domain/interface/user-profile.interface';
import { ProfileRepository } from '../../data/profile.repository';
import { BaseCreateUseCase } from 'src/base/use-cases/process/base-create.use-case';
import { Connection } from 'typeorm';
import { UserProfile } from 'src/module/auth/data/entities/user-profile.entity';
import { PremiumType } from 'src/base/constants';

export class ProfileLike extends BaseCreateUseCase<IUserProfile> {
  constructor(
    connection: Connection,
    private profileRepository: ProfileRepository,
    private likedUserId: string,
    private userProfileEntity: IUserProfile,
  ) {
    super(connection, profileRepository, UserProfile, userProfileEntity);
  }

  async beforeProcess(): Promise<void> {
    const unlimitedPackage = await this.profileRepository.getActivePackage(
      this.userProfileEntity.user_id,
      PremiumType.UNLIMITED
    );
    if (!unlimitedPackage) {
      if (await this.profileRepository.getActivityCount(this.userProfileEntity.user_id) >= 10) throw new Error('Your daily credit amount has been used up!')
    }
  }

  async setFindProperties(): Promise<any> {}

  async process(): Promise<void> {
    await this.profileRepository.likeProfile(
      this.userProfileEntity.user_id,
      this.likedUserId,
      this.queryRunner,
    );

    this.result = await this.profileRepository.browseProfile(this.userProfileEntity.user_id, this.likedUserId);
  }

  async afterProcess(): Promise<void> {}

  getResultBrowse() {
    return this.result;
  }
}
