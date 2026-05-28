import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stay, StayDocument } from './schema/stay.schema';

@Injectable()
export class StaysRepository {
  constructor(
    @InjectModel(Stay.name) private stayModel: Model<StayDocument>,
  ) {}

  async findAll(): Promise<Stay[]> {
    return this.stayModel.find().exec();
  }

  async findById(id: string): Promise<Stay | null> {
    return this.stayModel.findById(id).exec();
  }

  async create(data: Partial<Stay>): Promise<Stay> {
    const stay = new this.stayModel(data);
    return stay.save();
  }

  async update(id: string, data: Partial<Stay>): Promise<Stay | null> {
    return this.stayModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<Stay | null> {
    return this.stayModel.findByIdAndDelete(id).exec();
  }
}