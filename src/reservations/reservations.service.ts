import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservations.repository';
import { Reservation } from './schema/reservation.schema';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.findAll();
  }

  async findOne(id: string): Promise<Reservation | null> {
    return this.reservationsRepository.findById(id);
  }

  async create(data: Partial<Reservation>): Promise<Reservation> {
    return this.reservationsRepository.create(data);
  }

  async update(id: string, data: Partial<Reservation>): Promise<Reservation | null> {
    return this.reservationsRepository.update(id, data);
  }

  async remove(id: string): Promise<Reservation | null> {
    return this.reservationsRepository.delete(id);
  }
}