import { Injectable } from '@nestjs/common';
import { SignupDto } from '../controller/dto/signup.dto';
import { IUserProfile } from './interface/user-profile.interface';
import { Connection } from 'typeorm';
import { AuthRepository } from '../data/auth.repository';
import { UserProfileCreate } from './use-case/user-profile.create';
import { LoginDto } from '../controller/dto/login.dto';
import { IUserLogin } from './interface/user-login.interface';
import { UserLogin } from './use-case/user.login';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private connection: Connection,
    public jwtService: JwtService,
    private authRepository: AuthRepository,
  ) {}

  async signup(signupDto: SignupDto): Promise<IUserProfile> {
    const userProfileCreate = new UserProfileCreate(
      this.connection,
      this.authRepository,
      signupDto,
    );
    await userProfileCreate.execute();
    const result = await userProfileCreate.getResultSignup();
    return result;
  }

  async login(loginDto: LoginDto): Promise<IUserLogin> {
    const userLogin = new UserLogin(
      this.authRepository,
      this.jwtService,
      loginDto,
    );
    await userLogin.execute();
    return userLogin.getResultLogin();
  }
}
