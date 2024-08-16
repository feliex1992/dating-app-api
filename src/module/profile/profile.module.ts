import { Module } from '@nestjs/common';
import { ProfileService } from './domain/profile.service';
import { ProfileController } from './controller/profile.controller';
import { ProfileRepository } from './data/profile.repository';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from '../auth/data/entities/user-profile.entity';
import { UserPremium } from './data/entities/user-premium.entity';
import { UserActivity } from './data/entities/user-activity.entity';
import { UserLike } from './data/entities/user-like.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserPremiumRepository } from './data/user-premium.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      UserProfile,
      UserPremium,
      UserActivity,
      UserLike,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository, UserPremiumRepository],
})
export class ProfileModule {}
