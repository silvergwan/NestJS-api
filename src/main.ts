import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 전역 검증 파이프 등록
  // 요청이 들어올 때마다 DTO 규칙대로 자동 검증
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // DTO에 없는 필드는 자동으로 제거
      forbidNonWhitelisted: true, // DTO에 없는 필드 들어오면 400 에러
      transform: true,            // 타입 자동 변환 (string → number 등)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
