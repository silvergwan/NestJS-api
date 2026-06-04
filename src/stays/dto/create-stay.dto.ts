import { IsString, IsNumber, IsArray, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStayDto {
  @ApiProperty({ example: '제주 감귤밭 독채', description: '숙소 이름' })
  @IsString()
  name!: string;

  @ApiProperty({ example: '제주시 애월읍', description: '숙소 주소' })
  @IsString()
  location!: string;

  @ApiProperty({ example: 150000, description: '1박 가격' })
  @IsNumber()
  @Min(0)
  pricePerNight!: number;

  @ApiProperty({ example: 4, description: '최대 인원' })
  @IsNumber()
  @Min(1)
  maxGuests!: number;

  @ApiProperty({ example: 2, description: '방 개수' })
  @IsNumber()
  @Min(1)
  rooms!: number;

  @ApiPropertyOptional({
    example: ['바베큐', '주차', '반려동물 가능'],
    description: '편의시설',
  })
  @IsArray()
  @IsString({ each: true }) // 배열 안의 요소 하나하나가 string인지 검증
  @IsOptional()
  amenities?: string[];

  @ApiPropertyOptional({
    example: ['https://example.com/image.jpg'],
    description: '이미지 URL 목록',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ApiPropertyOptional({
    example: '감귤밭 한가운데 위치한 독채 숙소입니다.',
    description: '숙소 설명',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
