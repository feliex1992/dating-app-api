import { BaseCreateUseCase } from 'src/base/use-cases/process/base-create.use-case';
import { IUserPremium } from '../interface/user-premium.interface';
import { Connection, MoreThanOrEqual } from 'typeorm';
import { UserPremiumRepository } from '../../data/user-premium.repository';
import { UserPremium } from '../../data/entities/user-premium.entity';
import * as moment from 'moment';

export class UserPremiumCreate extends BaseCreateUseCase<IUserPremium> {
  constructor(
    connection: Connection,
    private userPremiumRepository: UserPremiumRepository,
    private userId: string,
    private userPremiumEntity: IUserPremium,
  ) {
    super(connection, userPremiumRepository, UserPremium, userPremiumEntity);
  }

  async beforeProcess(): Promise<void> {
    const today = moment().format('YYYY-MM-DD');
    const userPremium = await this.userPremiumRepository.getOne({
      where: {
        user_id: this.userId,
        expired_at: MoreThanOrEqual(today),
        premium_type: this.userPremiumEntity.premium_type,
      },
    });
    if (userPremium)
      throw new Error('The selected premium package is still active!');
    this.entity.user_id = this.userId;
  }

  async getResultByPremiumId(): Promise<IUserPremium> {
    const result = await this.userPremiumRepository.getOne({
      where: { premium_id: this.result['premium_id'] },
    });
    if (result.user.password) delete result.user.password;
    return result;
  }
}
