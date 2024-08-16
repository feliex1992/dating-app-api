import { IUserProfile } from 'src/module/auth/domain/interface/user-profile.interface';

export interface IUserActivity {
  activity_id?: string;
  user_id: string;
  user?: IUserProfile;
  visited_user_id?: string;
  visited_user?: IUserProfile;
  description: string;
  created_at?: Date;
}
