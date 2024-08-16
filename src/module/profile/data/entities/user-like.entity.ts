import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IUserLike } from '../../domain/interface/user-like.interface';
import { IUserProfile } from 'src/module/auth/domain/interface/user-profile.interface';
import { UserProfile } from 'src/module/auth/data/entities/user-profile.entity';

@Entity('user_like')
export class UserLike implements IUserLike {
  @PrimaryGeneratedColumn('uuid')
  like_id?: string;

  @Column('uuid', { nullable: false })
  user_id: string;

  @ManyToOne(() => UserProfile, (userProfile) => userProfile)
  @JoinColumn({ name: 'user_id' })
  user: IUserProfile;

  @Column('uuid', { nullable: false })
  user_id_liked: string;

  @ManyToOne(() => UserProfile, (userProfile) => userProfile)
  @JoinColumn({ name: 'user_id_liked' })
  user_liked: IUserProfile;

  @CreateDateColumn()
  created_at?: Date;
}
