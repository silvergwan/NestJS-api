import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Reservation, ReservationDocument } from './schema/reservation.schema';
import { Types } from 'mongoose';

@Injectable()
export class ReservationsRepository {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel.find().exec();
  }

  async findById(id: string): Promise<Reservation | null> {
    return this.reservationModel.findById(id).exec();
  }

  async findByStayId(
    stayId: string,
    session?: ClientSession,
  ): Promise<Reservation[]> {
    return this.reservationModel
      .find({
        stayId: new Types.ObjectId(stayId),
        status: { $ne: 'cancelled' },
      })
      .session(session ?? null)
      .exec();
  }

  async create(
    data: Partial<Reservation>,
    session: ClientSession,
  ): Promise<Reservation> {
    const reservation = new this.reservationModel(data);
    return reservation.save({ session });
  }

  async update(
    id: string,
    data: Partial<Reservation>,
  ): Promise<Reservation | null> {
    return this.reservationModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Reservation | null> {
    return this.reservationModel.findByIdAndDelete(id).exec();
  }
}
