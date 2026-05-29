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
import { Reservation } from './schema/reservation.schema';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Reservation>) {
    return this.reservationsService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<Reservation>) {
    return this.reservationsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
