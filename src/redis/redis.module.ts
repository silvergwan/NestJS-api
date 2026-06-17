import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import Redlock from 'redlock';

export const REDIS_CLIENT = 'REDIS_CLIENT';
export const REDLOCK_CLIENT = 'REDLOCK_CLIENT';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL');

        if (!redisUrl) {
          throw new Error('REDIS_URL is not defined');
        }

        return new Redis(redisUrl);
      },
      inject: [ConfigService],
    },
    {
      provide: REDLOCK_CLIENT,
      useFactory: (redis: Redis) => {
        return new Redlock([redis], {
          retryCount: 3,
          retryDelay: 200,
          retryJitter: 50,
        });
      },
      inject: [REDIS_CLIENT],
    },
  ],
  exports: [REDIS_CLIENT, REDLOCK_CLIENT],
})
export class RedisModule {}
