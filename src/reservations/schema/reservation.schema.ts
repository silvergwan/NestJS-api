import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReservationDocument = HydratedDocument<Reservation>;

// 상태값을 문자열로 직접 쓰면 오타 위험 있음
// enum으로 한 곳에서 관리
export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CHECKED_IN = 'checked_in',
  CHECKED_OUT = 'checked_out',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

// 상태가 언제, 어떤 이유로 바뀌었는지 기록하는 서브 스키마
@Schema({ _id: false }) // 배열 내부 항목에는 _id 불필요
export class StatusHistory {
  @Prop({ required: true, enum: ReservationStatus })
  status!: ReservationStatus;

  @Prop({ required: true, default: () => new Date() })
  changedAt!: Date;

  // 선택적으로 메모 남길 수 있게 (예: "노쇼 처리", "호스트 취소")
  @Prop()
  reason?: string;
}

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
    type: String,
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status!: ReservationStatus;

  // 상태 변경 이력 - 처음 생성 시 PENDING 이력 자동 삽입
  @Prop({
    type: [{ status: String, changedAt: Date, reason: String }],
    default: () => [
      { status: ReservationStatus.PENDING, changedAt: new Date() },
    ],
  })
  statusHistory!: StatusHistory[];
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
