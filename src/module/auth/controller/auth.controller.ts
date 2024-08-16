import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from '../domain/auth.service';
import { SignupDto } from './dto/signup.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { IUserLogin } from '../domain/interface/user-login.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    try {
      await this.authService.signup(signupDto);
      return "signup success.";
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const result: IUserLogin = await this.authService.login(loginDto);
      return result;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
