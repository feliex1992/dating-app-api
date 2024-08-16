import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUserProfile } from '../../domain/interface/user-profile.interface';
import { Gender } from 'src/base/constants';
import { IUserPremium } from 'src/module/profile/domain/interface/user-premium.interface';
import { UserPremium } from 'src/module/profile/data/entities/user-premium.entity';

@Entity('user_profile')
export class UserProfile implements IUserProfile {
  @PrimaryGeneratedColumn('uuid')
  user_id?: string;

  @Column('varchar', {
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column('varchar', { nullable: false })
  password?: string;

  @Column('varchar', { length: 100, nullable: true })
  address?: string;

  @Column('varchar', { length: 50, nullable: true })
  first_name?: string;

  @Column('varchar', { length: 50, nullable: true })
  last_name?: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.MALE,
  })
  gender?: Gender;

  @Column('varchar', { length: 50, nullable: true })
  place_of_birth?: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth?: string;

  @OneToMany(() => UserPremium, (userPremium) => userPremium.user)
  user_premium?: IUserPremium[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
