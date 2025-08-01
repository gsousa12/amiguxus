import { environment } from "common/config/environment";
import Redis, { RedisOptions } from "ioredis";

const redisOptions: RedisOptions = {
  host: environment.REDIS_HOST,
  port: environment.REDIS_PORT,
  password: environment.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  // connectTimeout: 10000,
};

export const redisClient = new Redis(redisOptions);
