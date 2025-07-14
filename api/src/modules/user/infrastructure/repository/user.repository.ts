import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { PrismaService } from 'src/common/modules/prisma/service/prisma.service';
import { User } from '@prisma/client';
import { SignupRequestDto } from '../../core/application/dtos/request/signup.request.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(request: SignupRequestDto): Promise<void> {
    // Cria o novo usuário
    await this.prisma.user.create({
      data: {
        name: request.name,
        email: request.email,
        passwordHash: request.password,
        phoneNumber: request.phoneNumber,
        state: request.state,
        city: request.city,
      },
    });
  }
}
