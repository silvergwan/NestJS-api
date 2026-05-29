import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaysModule } from './stays/stays.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/fineStay'),
    StaysModule,
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
