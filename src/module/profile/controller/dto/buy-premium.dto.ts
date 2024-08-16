import { IUserPremium } from '../../domain/interface/user-premium.interface';
import { ApiProperty } from '@nestjs/swagger';
import { PremiumType } from 'src/base/constants';
import { IsDateString, IsEnum } from 'class-validator';

export class BuyPremiumDto implements IUserPremium {
  @ApiProperty({
    description: 'select one of the options!',
    enum: PremiumType,
  })
  @IsEnum(PremiumType)
  premium_type: PremiumType;

  @ApiProperty({
    type: 'string',
    required: true,
    default: '2025-01-01',
  })
  @IsDateString()
  expired_at: string;
}
