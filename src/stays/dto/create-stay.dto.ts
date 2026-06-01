import { IsString, IsNumber, IsArray, IsOptional, Min } from 'class-validator';

export class CreateStayDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsNumber()
  @Min(0)
  pricePerNight: number;

  @IsNumber()
  @Min(1)
  maxGuests: number;

  @IsNumber()
  @Min(1)
  rooms: number;

  @IsArray()
  @IsString({ each: true }) // 배열 안의 요소 하나하나가 string인지 검증
  @IsOptional()
  amenities?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  description?: string;
}
