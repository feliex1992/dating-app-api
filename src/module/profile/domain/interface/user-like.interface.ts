import { IUserProfile } from 'src/module/auth/domain/interface/user-profile.interface';

export interface IUserLike {
  like_id?: string;
  user_id: string;
  user?: IUserProfile;
  user_id_liked: string;
  user_liked?: IUserProfile;
  created_at?: Date;
}
