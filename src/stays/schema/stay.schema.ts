import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StayDocument = HydratedDocument<Stay>;

@Schema({ timestamps: true }) // createdAt, updatedAt 자동 생성
export class Stay {
  
  @Prop({ required: true })
  name!: string; // 숙소 이름 ex) "제주 감귤밭 독채"

  @Prop({ required: true })
  location!: string; // 주소 ex) "제주시 애월읍"

  @Prop({ required: true })
  pricePerNight!: number; // 1박 가격

  @Prop({ required: true, min: 1 })
  maxGuests!: number; // 최대 인원

  @Prop({ required: true, min: 1 })
  rooms!: number; // 방 개수

  @Prop({ default: [] })
  amenities!: string[]; // 편의시설 ex) ["바베큐", "주차", "반려동물 가능"]

  @Prop({ default: [] })
  images!: string[]; // 이미지 URL 목록

  @Prop({ default: true })
  isAvailable!: boolean; // 예약 가능 여부

  @Prop()
  description!: string; // 숙소 설명
}

export const StaySchema = SchemaFactory.createForClass(Stay);