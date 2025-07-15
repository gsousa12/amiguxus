import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis, { Redis as RedisClient } from 'ioredis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService): RedisClient => {
        const url = config.get<string>('REDIS_URL');
        return new Redis(url!, {
          // Se for "rediss://", ioredis já liga o TLS;
          // aqui só reforçamos para garantir handshake
          tls: url!.startsWith('rediss://') ? {} : undefined,
          retryStrategy: (times) => Math.min(50 * times, 2000),
        });
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
