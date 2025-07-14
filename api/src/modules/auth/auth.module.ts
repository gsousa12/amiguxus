import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './http/auth.controller';
import { AUTH_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { AuthRepository } from './infrastructure/repositories/auth.repository';
import { AuthService } from './core/application/service/auth.service';
import { BcryptAdapter } from 'src/common/adapters/bcrypt.adapter';
import { AuthHelper } from './core/application/helpers/auth.helper';
import { PrismaService } from 'src/common/modules/prisma/service/prisma.service';
import { JwtStrategy } from './core/application/strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET ?? '',
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN ?? '' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
    AuthService,
    BcryptAdapter,
    AuthHelper,
    PrismaService,
    JwtStrategy,
  ],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
