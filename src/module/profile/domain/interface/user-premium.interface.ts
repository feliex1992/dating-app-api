import { PremiumType } from 'src/base/constants';
import { IUserProfile } from 'src/module/auth/domain/interface/user-profile.interface';

export interface IUserPremium {
  premium_id?: string;
  user_id?: string;
  user?: IUserProfile;
  premium_type: PremiumType;
  expired_at: string;
  created_at?: Date;
  updated_at?: Date;
}
