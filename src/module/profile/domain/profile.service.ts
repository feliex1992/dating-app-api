import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'typeorm';
import { ProfileRepository } from '../data/profile.repository';
import { UpdateProfileDto } from '../controller/dto/update-profile.dto';
import { IUserProfile } from 'src/module/auth/domain/interface/user-profile.interface';
import { ProfileUpdate } from './use-case/profile.update';
import { Singleton } from 'src/base/singleton';
import { BuyPremiumDto } from '../controller/dto/buy-premium.dto';
import { IUserPremium } from './interface/user-premium.interface';
import { UserPremiumCreate } from './use-case/user-premium.create';
import { UserPremiumRepository } from '../data/user-premium.repository';
import { ProfileBrowse } from './use-case/profile.browse';
import { ProfileLike } from './use-case/profile.like';
import { ProfilePass } from './use-case/profile.pass';

@Injectable()
export class ProfileService {
  constructor(
    private connection: Connection,
    public jwtService: JwtService,
    private profileRepository: ProfileRepository,
    private userPremiumRepository: UserPremiumRepository,
  ) {}

  async updateProfile(updateProfileDto: UpdateProfileDto): Promise<IUserProfile> {
    const singleton = Singleton.getInstance();
    const userId = singleton.getUser().user_id;

    const userUpdate = new ProfileUpdate(
      this.connection,
      this.profileRepository,
      userId,
      updateProfileDto,
    );
    await userUpdate.execute();
    const result = await userUpdate.getResultByUserId();
    return result;
  }

  async buyPremium(buyPremiumDto: BuyPremiumDto): Promise<IUserPremium> {
    const singleton = Singleton.getInstance();
    const userId = singleton.getUser().user_id;

    const userPremiumCreate = new UserPremiumCreate(
      this.connection,
      this.userPremiumRepository,
      userId,
      buyPremiumDto,
    );
    await userPremiumCreate.execute();
    const result = await userPremiumCreate.getResultByPremiumId();
    return result;
  }

  async browse(): Promise<IUserProfile> {
    const singleton = Singleton.getInstance();
    const userData = singleton.getUser();

    const profileBrowser = new ProfileBrowse(
      this.connection,
      this.profileRepository,
      {
        user_id: userData.user_id,
        email: userData.email
      },
    );
    await profileBrowser.execute();
    const result = await profileBrowser.getResultBrowse();
    return result;
  }

  async likeProfile(liked_user_id: string): Promise<IUserProfile> {
    const singleton = Singleton.getInstance();
    const userData = singleton.getUser();

    const profileLike = new ProfileLike(
      this.connection,
      this.profileRepository,
      liked_user_id,
      {
        user_id: userData.user_id,
        email: userData.email
      },
    );
    await profileLike.execute();
    const result = await profileLike.getResultBrowse();
    return result;
  }

  async passProfile(passed_user_id: string): Promise<IUserProfile> {
    const singleton = Singleton.getInstance();
    const userData = singleton.getUser();

    const profilePass = new ProfilePass(
      this.connection,
      this.profileRepository,
      passed_user_id,
      {
        user_id: userData.user_id,
        email: userData.email
      },
    );
    await profilePass.execute();
    const result = await profilePass.getResultBrowse();
    return result;
  }
}
