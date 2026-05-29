import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema({ timestamps: true })
export class Reservation {
  // 어떤 숙소인지 - Stay의 _id를 참조
  @Prop({ type: Types.ObjectId, ref: 'Stay', required: true })
  stayId!: Types.ObjectId;

  // 예약자 이름
  @Prop({ required: true })
  guestName!: string;

  // 예약자 연락처
  @Prop({ required: true })
  guestPhone!: string;

  // 체크인 날짜
  @Prop({ required: true })
  checkIn!: Date;

  // 체크아웃 날짜
  @Prop({ required: true })
  checkOut!: Date;

  // 인원 수
  @Prop({ required: true, min: 1 })
  guestCount!: number;

  // 총 결제 금액
  @Prop({ required: true })
  totalPrice!: number;

  // 예약 상태
  @Prop({ 
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  })
  status!: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);