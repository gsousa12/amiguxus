import { Injectable } from '@nestjs/common';
import { BcryptAdapter } from 'src/common/adapters/bcrypt.adapter';

@Injectable()
export class UserHelper {
  constructor(private readonly bcryptAdapter: BcryptAdapter) {}

  encryptPassword(password: string): Promise<string> {
    return this.bcryptAdapter.hash(password);
  }
}
