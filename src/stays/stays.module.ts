import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StaysController } from './stays.controller';
import { StaysService } from './stays.service';
import { StaysRepository } from './stays.repository';
import { Stay, StaySchema } from "./schema/stay.schema"

@Module({
  imports: [
    // 이 모듈에서 Stay 컬렉션 사용하겠다고 등록
    MongooseModule.forFeature([{ name: Stay.name, schema: StaySchema }]),
  ],
  controllers: [StaysController],
  providers: [StaysService, StaysRepository],
})
export class StaysModule {}