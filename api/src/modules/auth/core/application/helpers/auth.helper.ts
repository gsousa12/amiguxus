import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { BcryptAdapter } from 'src/common/adapters/bcrypt.adapter';

@Injectable()
export class AuthHelper {
  constructor(private readonly bcryptAdapter: BcryptAdapter) {}

  comparePassword(password: string, userPassword: string): Promise<boolean> {
    return this.bcryptAdapter.compare(password, userPassword);
  }

  implementsCookies(access_token: string, res: Response, ttlSeconds = 3600) {
    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: ttlSeconds * 1000, // agora 8 h = 28 800 000 ms
    });
  }

  clearCookies(res: Response) {
    const isProductionEnvironment = process.env.NODE_ENV === 'production';

    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: isProductionEnvironment ? 'none' : 'lax',
      maxAge: Number(3600000),
    });
  }
}
