import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PetModule } from './modules/pet/pet.module';
import redisConfig from './common/utils/redis.config';
import { RedisModule } from './common/modules/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [redisConfig],
    }),
    AuthModule,
    UserModule,
    PetModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
