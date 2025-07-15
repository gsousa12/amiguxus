import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AUTH_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { IAuthService } from './interfaces/auth-service.interface';
import { LoginRequestDto } from '../dtos/request/login.request.dto';
import { Response, Request } from 'express';
import { User } from '@prisma/client';
import { AuthRepository } from 'src/modules/auth/infrastructure/repositories/auth.repository';
import { AuthHelper } from '../helpers/auth.helper';
import { JwtService } from '@nestjs/jwt';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from 'src/common/modules/redis/redis.module';

const JWT_TTL_SECONDS = Number(process.env.JWT_TTL_SECONDS) || 60 * 60 * 8;

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepository: AuthRepository,
    private readonly authHelper: AuthHelper,
    private readonly jwtService: JwtService,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
  ) {}

  /* ---------- LOGIN ---------- */

  async login(request: LoginRequestDto, res: Response): Promise<void> {
    const user = await this.validateUser(request.email, request.password);

    const payload = { userId: user.id, name: user.name, email: user.email };
    const access_token = this.jwtService.sign(payload, {
      expiresIn: `${JWT_TTL_SECONDS}s`,
    });

    /* grava no Redis */
    await this.redis.set(this.redisKey(user.id), access_token, 'EX', JWT_TTL_SECONDS);

    /* grava cookie */
    this.authHelper.implementsCookies(access_token, res, JWT_TTL_SECONDS);
  }

  /* ---------- VALIDATE ---------- */

  async validate(userId: number, req: Request): Promise<void> {
    const tokenFromCookie = req.cookies?.access_token;
    if (!tokenFromCookie) throw new UnauthorizedException('Token ausente.');

    /* token salvo no Redis */
    const tokenInRedis = await this.redis.get(this.redisKey(userId));
    if (!tokenInRedis) throw new UnauthorizedException('Sessão expirada.');

    if (tokenFromCookie !== tokenInRedis) throw new UnauthorizedException('Token inválido.');

    /* verifica assinatura + expiração */
    try {
      this.jwtService.verify(tokenFromCookie);
    } catch {
      throw new UnauthorizedException('Token expirado ou mal-formado.');
    }
  }

  /* ---------- LOGOUT ---------- */

  async logout(userId: number, res: Response): Promise<void> {
    await this.redis.del(this.redisKey(userId));
    this.authHelper.clearCookies(res);
  }

  /* ---------- HELPERS ---------- */

  private redisKey(userId: number) {
    return `auth:jwt:${userId}`;
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) throw new NotFoundException('Não existe nenhum usuário registrado com esse email.');

    const isValidPassword = await this.authHelper.comparePassword(password, user.passwordHash);
    if (!isValidPassword) throw new BadRequestException('Senha incorreta.');

    return user;
  }
}
