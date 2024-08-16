import { IUserProfile } from "./user-profile.interface";

export interface IUserLogin {
  token?: string;
  user?: IUserProfile;
}
