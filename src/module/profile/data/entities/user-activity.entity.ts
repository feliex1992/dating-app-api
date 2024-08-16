import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IUserActivity } from '../../domain/interface/user-activity.interface';
import { IUserProfile } from 'src/module/auth/domain/interface/user-profile.interface';
import { UserProfile } from 'src/module/auth/data/entities/user-profile.entity';

@Entity('user_activity')
export class UserActivity implements IUserActivity {
  @PrimaryGeneratedColumn('uuid')
  activity_id?: string;

  @Column('uuid', { nullable: false })
  user_id: string;

  @ManyToOne(() => UserProfile, (userProfile) => userProfile)
  @JoinColumn({ name: 'user_id' })
  user?: IUserProfile;

  @Column('uuid', { nullable: true })
  visited_user_id?: string;

  @ManyToOne(() => UserProfile, (userProfile) => userProfile)
  @JoinColumn({ name: 'visited_user_id' })
  visited_user?: IUserProfile;

  @Column('varchar', { length: 100, nullable: true })
  description: string;

  @CreateDateColumn()
  created_at?: Date;
}
