import { Injectable } from "@nestjs/common";
import { BaseDataRepository } from "src/base/base-data.repository";
import { IUserPremium } from "../domain/interface/user-premium.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { UserPremium } from "./entities/user-premium.entity";
import { Repository } from "typeorm";


@Injectable()
export class UserPremiumRepository extends BaseDataRepository<IUserPremium> {
  tableName: string = 'user_premium';
  relations: string[] = ['user'];

  constructor(
    @InjectRepository(UserPremium)
    public repository: Repository<IUserPremium>,
  ) {
    super(repository);
  }
}
