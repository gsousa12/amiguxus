import { User } from '@prisma/client';
import { LoginRequestDto } from '../../dtos/request/login.request.dto';
import { Response } from 'express';

export interface IAuthService {
  login(request: LoginRequestDto, response: Response): Promise<void>;
  validateUser(email: string, password: string): Promise<User>;
}
