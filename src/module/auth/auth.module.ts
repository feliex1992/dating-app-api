import { Module } from '@nestjs/common';
import { AuthService } from './domain/auth.service';
import { AuthController } from './controller/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './data/entities/user-profile.entity';
import { AuthRepository } from './data/auth.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserProfile]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
