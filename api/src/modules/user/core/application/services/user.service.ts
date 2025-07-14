import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/user-service.interface';
import { UserHelper } from '../helpers/user.helper';
import { USER_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { UserRepository } from 'src/modules/user/infrastructure/repository/user.repository';
import { SignupRequestDto } from '../dtos/request/signup.request.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly userHelper: UserHelper,
  ) {}

  async signup(request: SignupRequestDto): Promise<void> {
    const existingUser = await this.userRepository.findUserByEmail(request.email);
    if (existingUser) {
      throw new BadRequestException('Este e-mail já está em uso.');
    }

    const hashedPassword = await this.userHelper.encryptPassword(request.password);
    request.password = hashedPassword;

    await this.userRepository.createUser(request);
  }
}
