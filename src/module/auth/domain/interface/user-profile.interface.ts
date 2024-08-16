import { Gender } from 'src/base/constants';
import { IUserPremium } from 'src/module/profile/domain/interface/user-premium.interface';

export interface IUserProfile {
  user_id?: string;
  email: string;
  password?: string;
  retype_password?: string;
  first_name?: string;
  last_name?: string;
  gender?: Gender;
  place_of_birth?: string;
  date_of_birth?: string;
  address?: string;
  user_premium?: IUserPremium[];
  created_at?: Date;
  updated_at?: Date;
}
