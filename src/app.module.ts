import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaysModule } from './stays/stays.module';

@Module({
  imports: [StaysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
