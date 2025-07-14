import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { BcryptAdapter } from 'src/common/adapters/bcrypt.adapter';

@Injectable()
export class AuthHelper {
  constructor(private readonly bcryptAdapter: BcryptAdapter) {}

  comparePassword(password: string, userPassword: string): Promise<boolean> {
    return this.bcryptAdapter.compare(password, userPassword);
  }

  implementsCookies(access_token: string, res: Response) {
    const isProductionEnvironment = process.env.NODE_ENV === 'production';

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: isProductionEnvironment,
      sameSite: isProductionEnvironment ? 'none' : 'lax',
      maxAge: Number(3600000),
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
