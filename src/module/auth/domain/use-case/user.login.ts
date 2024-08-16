import { BaseGetOneUseCase } from 'src/base/use-cases/process/base-get-one.use-case';
import { LoginDto } from '../../controller/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUserLogin } from '../interface/user-login.interface';
import { IUserProfile } from '../interface/user-profile.interface';
import { AuthRepository } from '../../data/auth.repository';

export class UserLogin extends BaseGetOneUseCase<IUserProfile> {
  token = '-';

  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private loginDto: LoginDto,
  ) {
    super(authRepository);
  }

  beforeProcess(): Promise<void> {
    return;
  }

  async setFindProperties(): Promise<any> {
    return { email: this.loginDto.email };
  }

  async process(): Promise<void> {
    let findProperties = {};
    findProperties = await this.setFindProperties();

    const userData = await this.authRepository.getOne({
      where: findProperties,
    });
    if (!userData) throw this.handleErrorLogin();
    this.result = userData;
  }

  async afterProcess(): Promise<void> {
    if (await bcrypt.compare(this.loginDto.password, this.result.password)) {
      const payload: any = {
        user_id: this.result.user_id,
        email: this.result.email,
        first_name: this.result.first_name,
        last_name: this.result.last_name,
      };
      this.token = this.jwtService.sign(payload);
      return;
    }
    this.handleErrorLogin();
  }

  handleErrorLogin(): void {
    throw new Error('Incorrect email or password!');
  }

  getResultLogin(): IUserLogin {
    if (this.result.password) delete this.result.password;
    
    return {
      token: this.token,
      user: this.result,
    };
  }
}
