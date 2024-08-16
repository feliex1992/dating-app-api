import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from '../domain/profile.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/base/auth/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { BuyPremiumDto } from './dto/buy-premium.dto';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Put()
  async update(@Body() updateProfileDto: UpdateProfileDto) {
    try {
      return await this.profileService.updateProfile(updateProfileDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Post('buy-premium')
  async buyPremium(@Body() buyPremiumDto: BuyPremiumDto) {
    try {
      return await this.profileService.buyPremium(buyPremiumDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Get('browse')
  async browse() {
    try {
      return await this.profileService.browse();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Get('like/:id')
  async likeAccount(@Param('id') liked_user_id: string) {
    try {
      return await this.profileService.likeProfile(liked_user_id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Get('pass/:id')
  async passAccount(@Param('id') passed_user_id: string) {
    try {
      return await this.profileService.passProfile(passed_user_id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
