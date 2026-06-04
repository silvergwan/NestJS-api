import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './schema/reservation.schema';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('예약')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @ApiOperation({ summary: '예약 목록 조회' })
  @ApiResponse({ status: 200, description: '예약 목록 반환' })
  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @ApiOperation({ summary: '예약 단건 조회' })
  @ApiResponse({ status: 200, description: '예약 반환' })
  @ApiResponse({ status: 404, description: '예약 없음' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @ApiOperation({ summary: '예약 생성' })
  @ApiResponse({ status: 201, description: '예약 생성 완료' })
  @ApiResponse({ status: 400, description: '날짜 중복' })
  @Post()
  create(@Body() body: CreateReservationDto) {
    return this.reservationsService.create(body);
  }

  @ApiOperation({ summary: '예약 수정' })
  @ApiResponse({ status: 200, description: '예약 수정 완료' })
  @ApiResponse({ status: 404, description: '예약 없음' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<Reservation>) {
    return this.reservationsService.update(id, body);
  }

  @ApiOperation({ summary: '예약 삭제' })
  @ApiResponse({ status: 200, description: '예약 삭제 완료' })
  @ApiResponse({ status: 404, description: '예약 없음' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
