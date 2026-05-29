import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './schema/reservation.schema';

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

  async findByStayId(stayId: string): Promise<Reservation[]> {
    return this.reservationModel
      .find({ stayId, status: { $ne: 'cancelled' } })
      .exec();
  }

  async create(data: Partial<Reservation>): Promise<Reservation> {
    const reservation = new this.reservationModel(data);
    return reservation.save();
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
