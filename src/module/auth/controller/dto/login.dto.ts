import { IUserProfile } from '../../domain/interface/user-profile.interface';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
} from 'class-validator';

export class LoginDto implements IUserProfile {
  @ApiProperty({
    type: 'string',
    required: true,
    default: 'admin@gmail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'admin',
  })
  @IsString()
  password: string;
}
