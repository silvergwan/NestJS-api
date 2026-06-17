import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';
import Redlock, { Lock } from 'redlock';

import { ReservationsRepository } from './reservations.repository';
import { Reservation } from './schema/reservation.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { REDLOCK_CLIENT } from '../redis/redis.module';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(REDLOCK_CLIENT) private readonly redlock: Redlock,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.findAll();
  }

  async findOne(id: string): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findById(id);

    if (!reservation) {
      throw new NotFoundException(`${id}에 해당하는 예약이 없습니다.`);
    }

    return reservation;
  }

  async create(data: CreateReservationDto): Promise<Reservation> {
    const { stayId, checkIn, checkOut } = data;
    const newCheckIn = new Date(checkIn);
    const newCheckOut = new Date(checkOut);

    const lockKey = `reservation:lock:stayId:${stayId}`;
    const lockTtl = 5000;
    let lock: Lock;

    try {
      // 락 획득 시도 (retryCount만큼 재시도 후 실패하면 예외 발생)
      lock = await this.redlock.acquire([lockKey], lockTtl);
    } catch (err) {
      // 락 획득 실패 = 해당 숙소에 동시 요청이 몰린 상황
      throw new BadRequestException(
        '잠시 후 다시 시도해주세요. (동시 요청 충돌)',
      );
    }

    const session = await this.connection.startSession();

    try {
      let result: Reservation;

      await session.withTransaction(async () => {
        const existingReservations =
          await this.reservationsRepository.findByStayId(stayId, session);

        const overlapping = existingReservations.filter(
          (reservation) =>
            newCheckIn < new Date(reservation.checkOut) &&
            newCheckOut > new Date(reservation.checkIn),
        );

        // 에러를 변수에 저장했다 주는 방식에서 바로 발생
        if (overlapping.length > 0) {
          throw new BadRequestException({
            message: '이미 예약된 날짜입니다.',
            conflictDates: overlapping.map((reservation) => ({
              checkIn: reservation.checkIn,
              checkOut: reservation.checkOut,
            })),
          });
        }

        result = await this.reservationsRepository.create(
          {
            ...data,
            stayId: new Types.ObjectId(stayId),
            checkIn: newCheckIn,
            checkOut: newCheckOut,
          },
          session,
        );
      });

      return result!;
    } finally {
      session.endSession();
      await lock.release();
    }
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
