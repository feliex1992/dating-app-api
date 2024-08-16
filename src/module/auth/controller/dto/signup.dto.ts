import { Gender } from 'src/base/constants';
import { IUserProfile } from '../../domain/interface/user-profile.interface';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsString,
  ValidateIf,
} from 'class-validator';

export class SignupDto implements IUserProfile {
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

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'admin',
  })
  @IsString()
  retype_password: string;

  @ApiProperty({
    type: 'string',
    required: false,
    default: 'John',
  })
  @ValidateIf((body) => body.first_name)
  @IsString()
  first_name?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    default: 'Doe',
  })
  @ValidateIf((body) => body.last_name)
  @IsString()
  last_name?: string;

  @ApiProperty({
    description: 'description of the severity property',
    enum: Gender,
  })
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({
    type: 'string',
    required: false,
    default: 'bandung barat',
  })
  @ValidateIf((body) => body.place_of_birth)
  @IsString()
  place_of_birth?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    default: '2000-01-01',
  })
  @ValidateIf((body) => body.date_of_birth)
  @IsDateString()
  date_of_birth?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    default: 'bandung barat',
  })
  @ValidateIf((body) => body.address)
  @IsString()
  address?: string;
}
