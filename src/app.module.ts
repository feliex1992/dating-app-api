import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { ProfileModule } from './module/profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './module/auth/data/entities/user-profile.entity';
import { JwtStrategy } from './base/auth/jwt.strategy';
import { UserPremium } from './module/profile/data/entities/user-premium.entity';
import { UserLike } from './module/profile/data/entities/user-like.entity';
import { UserActivity } from './module/profile/data/entities/user-activity.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DBHOST,
      port: parseInt(process.env.DBPORT),
      username: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DBNAME,
      entities: [UserProfile, UserPremium, UserLike, UserActivity],
    }),
    AuthModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
