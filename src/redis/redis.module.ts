import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import Redlock from 'redlock';

// Redis 클라이언트를 NestJS DI 컨테이너에 등록하기 위한 토큰
export const REDIS_CLIENT = 'REDIS_CLIENT';
export const REDLOCK_CLIENT = 'REDLOCK_CLIENT';

@Global() // 어디서든 import 없이 주입 가능하게
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: (configService: ConfigService) => {
        return new Redis({
          host: configService.get('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
        });
      },
      inject: [ConfigService],
    },
    {
      provide: REDLOCK_CLIENT,
      useFactory: (redis: Redis) => {
        return new Redlock(
          [redis], // 락을 관리할 Redis 인스턴스 목록
          {
            // 락 획득 재시도 횟수 (0 = 실패하면 바로 에러)
            retryCount: 3,
            // 재시도 간격 (ms)
            retryDelay: 200,
            // 재시도 간격에 추가되는 랜덤 지터 (ms)
            // 여러 서버가 동시에 재시도할 때 충돌 방지
            retryJitter: 50,
          },
        );
      },
      inject: [REDIS_CLIENT],
    },
  ],
  exports: [REDIS_CLIENT, REDLOCK_CLIENT],
})
export class RedisModule {}
