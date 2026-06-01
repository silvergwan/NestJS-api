import { Injectable, BadRequestException } from '@nestjs/common';
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
    const { stayId, checkIn, checkOut } = data;

    const newCheckIn = new Date(checkIn!);
    const newCheckOut = new Date(checkOut!);

    const existingReservations = await this.reservationsRepository.findByStayId(
      String(stayId),
    );

    const isOverlap = existingReservations.some(
      (reservation) =>
        newCheckIn < new Date(reservation.checkOut) &&
        newCheckOut > new Date(reservation.checkIn),
    );

    if (isOverlap) {
      throw new BadRequestException({
        message: '이미 예약된 날짜입니다.',
        conflictDates: existingReservations
          .filter(
            (reservation) =>
              newCheckIn < new Date(reservation.checkOut) &&
              newCheckOut > new Date(reservation.checkIn),
          )
          .map((reservation) => ({
            checkIn: reservation.checkIn,
            checkOut: reservation.checkOut,
          })),
      });
    }

    return this.reservationsRepository.create(data);
  }

  async update(
    id: string,
    data: Partial<Reservation>,
  ): Promise<Reservation | null> {
    return this.reservationsRepository.update(id, data);
  }

  async remove(id: string): Promise<Reservation | null> {
    return this.reservationsRepository.delete(id);
  }
}
