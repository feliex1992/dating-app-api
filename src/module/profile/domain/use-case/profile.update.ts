import { BaseUpdateUseCase } from 'src/base/use-cases/process/base-update.use-case';
import { IUserProfile } from 'src/module/auth/domain/interface/user-profile.interface';
import { Connection, Not } from 'typeorm';
import { ProfileRepository } from '../../data/profile.repository';
import { UserProfile } from 'src/module/auth/data/entities/user-profile.entity';

export class ProfileUpdate  extends BaseUpdateUseCase<IUserProfile> {
  constructor(
    private profileCon: Connection,
    private profileRepository: ProfileRepository,
    private userId: string,
    private userProfileEntity: IUserProfile,
  ) {
    super(profileCon, profileRepository, UserProfile, userId, userProfileEntity);
  }

  async beforeProcess(): Promise<void> {
    const userData = await this.profileRepository.getOne({
      where: { email: this.userProfileEntity.email, user_id: Not(this.userId) },
    });

    if (userData) throw new Error('email has been used by another user!');
    return;
  }

  async process(): Promise<void> {
    this.result = await this.profileRepository.updateDataByUserId(
      this.queryRunner,
      this.entityTarget,
      this.userId,
      this.updatedData,
    );
  }

  afterProcess(): Promise<void> {
    return;
  }

  async getResultByUserId() {
    const result = await this.profileRepository.getOne({
      where: { user_id: this.result['user_id'] },
    });
    return result;
  }
}
