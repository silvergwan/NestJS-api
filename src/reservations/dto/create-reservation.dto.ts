import { IsString, IsNumber, IsDateString, Min } from 'class-validator';
import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ example: '6a183836f1bdf3773088c4fc', description: '숙소 ID' })
  @IsMongoId() // MongoDB ObjectId 형식인지 검증
  stayId!: string;

  @ApiProperty({ example: '최은관', description: '예약자 이름' })
  @IsString()
  guestName!: string;

  @ApiProperty({ example: '010-4110-1673', description: '예약자 연락처' })
  @IsString()
  guestPhone!: string;

  @ApiProperty({ example: '2026-07-10', description: '체크인 날짜' })
  @IsDateString() // "2026-07-10" 형식인지 검증
  checkIn!: string;

  @ApiProperty({ example: '2026-07-13', description: '체크아웃 날짜' })
  @IsDateString()
  checkOut!: string;

  @ApiProperty({ example: 2, description: '인원 수' })
  @IsNumber()
  @Min(1)
  guestCount!: number;

  @ApiProperty({ example: 450000, description: '총 결제 금액' })
  @IsNumber()
  @Min(0)
  totalPrice!: number;
}
