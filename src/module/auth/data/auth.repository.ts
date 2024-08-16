import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseDataRepository } from 'src/base/base-data.repository';
import { Repository } from 'typeorm';
import { IUserProfile } from '../domain/interface/user-profile.interface';
import { UserProfile } from './entities/user-profile.entity';

@Injectable()
export class AuthRepository extends BaseDataRepository<IUserProfile> {
  tableName: string = 'user_profile';
  relations: string[] = [];

  constructor(
    @InjectRepository(UserProfile)
    public repository: Repository<IUserProfile>,
  ) {
    super(repository);
  }
}
