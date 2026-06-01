import { IsString, IsNumber, IsDateString, Min } from 'class-validator';
import { IsMongoId } from 'class-validator';

export class CreateReservationDto {
  @IsMongoId() // MongoDB ObjectId 형식인지 검증
  stayId!: string;

  @IsString()
  guestName!: string;

  @IsString()
  guestPhone!: string;

  @IsDateString() // "2026-07-10" 형식인지 검증
  checkIn!: string;

  @IsDateString()
  checkOut!: string;

  @IsNumber()
  @Min(1)
  guestCount!: number;

  @IsNumber()
  @Min(0)
  totalPrice!: number;
}
