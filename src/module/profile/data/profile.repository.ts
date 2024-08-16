import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseDataRepository } from 'src/base/base-data.repository';
import { UserProfile } from 'src/module/auth/data/entities/user-profile.entity';
import { IUserProfile } from 'src/module/auth/domain/interface/user-profile.interface';
import { EntityTarget, Not, QueryRunner, Repository } from 'typeorm';
import { IUserActivity } from '../domain/interface/user-activity.interface';
import { UserActivity } from './entities/user-activity.entity';
import * as moment from 'moment';
import { IUserPremium } from '../domain/interface/user-premium.interface';
import { PremiumType } from 'src/base/constants';
import { UserPremium } from './entities/user-premium.entity';
import { UserLike } from './entities/user-like.entity';
import { IUserLike } from '../domain/interface/user-like.interface';

@Injectable()
export class ProfileRepository extends BaseDataRepository<IUserProfile> {
  tableName: string = 'user_profile';
  relations: string[] = ['user_premium'];

  constructor(
    @InjectRepository(UserProfile)
    public repository: Repository<IUserProfile>,

    @InjectRepository(UserActivity)
    private userActivityRepository: Repository<IUserActivity>,

    @InjectRepository(UserPremium)
    private userPremiumRepository: Repository<IUserPremium>,

    @InjectRepository(UserLike)
    private userLikeRepository: Repository<IUserLike>,
  ) {
    super(repository);
  }

  async updateDataByUserId(
    queryRunner: QueryRunner,
    entityTarget: EntityTarget<IUserProfile>,
    userId: string,
    updatedData: IUserProfile,
  ): Promise<IUserProfile> {
    const findOption: any = { user_id: userId };
    const userProfileEntity: IUserProfile = await queryRunner.manager.findOneBy(
      entityTarget,
      findOption,
    );
    if (!userProfileEntity) throw new Error('Data not found!');
    Object.assign(userProfileEntity, updatedData);
    await queryRunner.manager.save(userProfileEntity);
    return userProfileEntity;
  }

  async getActivePackage(userId: String, premiumType: PremiumType): Promise<IUserPremium> {
    const result = await this.userPremiumRepository.createQueryBuilder('up')
      .where(`up.user_id = '${userId}' AND up.premium_type = '${premiumType}' AND expired_at >= '${moment().format('YYYY-MM-DD')}'`)
      .getOne();
    return result;
  }

  async getActivityCount(userId: string): Promise<number> {
    return await this.userActivityRepository.createQueryBuilder('ua')
      .where(`ua.user_id = '${userId}' AND ua.created_at >= '${moment().format('YYYY-MM-DD')}'`)
      .getCount();
  }

  async browseProfile(userId: string, excludeUserId: string): Promise<IUserProfile> {
    const userProfile = await this.repository.createQueryBuilder('p')
      .where(`p.user_id NOT IN ('${userId}', '${excludeUserId}') AND ` + 'p.user_id NOT IN (' + 
          this.userActivityRepository.createQueryBuilder('ua')
            .select('ua.visited_user_id')
            .where(`ua.user_id = '${userId}' AND ua.visited_user_id IS NOT NULL AND ua.created_at >= '${moment().format('YYYY-MM-DD')}'`)
            .getQuery() + ')')
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();
    return userProfile;
  }

  async likeProfile(userId: string, likedUserId: string, queryRunner: QueryRunner): Promise<void> {
    const userLike: IUserLike = {
      user_id: userId,
      user_id_liked: likedUserId,
    }
    const newEntityLike = queryRunner.manager.create(UserLike, userLike);
    await queryRunner.manager.save(newEntityLike);

    const userActivity: IUserActivity = {
      user_id: userId,
      visited_user_id: likedUserId,
      description: `Like profile user: ${likedUserId}`,
    }
    const newEntityActivity = queryRunner.manager.create(UserActivity, userActivity);
    await queryRunner.manager.save(newEntityActivity);
  }

  async passProfile(userId: string, passedUserId: string, queryRunner: QueryRunner): Promise<void> {
    const userActivity: IUserActivity = {
      user_id: userId,
      visited_user_id: passedUserId,
      description: `Pass profile user: ${passedUserId}`,
    }
    const newEntityActivity = queryRunner.manager.create(UserActivity, userActivity);
    await queryRunner.manager.save(newEntityActivity);
  }
}
