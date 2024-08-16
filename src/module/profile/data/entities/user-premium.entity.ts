import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUserPremium } from '../../domain/interface/user-premium.interface';
import { IUserProfile } from 'src/module/auth/domain/interface/user-profile.interface';
import { UserProfile } from 'src/module/auth/data/entities/user-profile.entity';
import { PremiumType } from 'src/base/constants';

@Entity('user_premium')
export class UserPremium implements IUserPremium {
  @PrimaryGeneratedColumn('uuid')
  premium_id?: string;

  @Column('uuid', { nullable: false })
  user_id: string;

  @ManyToOne(() => UserProfile, (userProfile) => userProfile)
  @JoinColumn({ name: 'user_id' })
  user: IUserProfile;

  @Column({
    type: 'enum',
    enum: PremiumType,
    nullable: false,
  })
  premium_type: PremiumType;

  @Column({ type: 'date', nullable: true })
  expired_at: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
