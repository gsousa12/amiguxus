import { LoginRequestDto } from '../../dtos/request/login.request.dto';
import { Request, Response } from 'express';

export interface IAuthService {
  login(request: LoginRequestDto, response: Response): Promise<void>;
  validate(userId: number, req: Request): Promise<void>;
}
