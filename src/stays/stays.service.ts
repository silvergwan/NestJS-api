import { Injectable, NotFoundException } from '@nestjs/common';
import { StaysRepository } from './stays.repository';
import { Stay } from './schema/stay.schema';

@Injectable()
export class StaysService {
  constructor(
    // 이제 Model 대신 Repository를 주입받음
    private readonly staysRepository: StaysRepository,
  ) {}

  async findAll(): Promise<Stay[]> {
    return this.staysRepository.findAll();
  }

  async findOne(id: string): Promise<Stay> {
    const stay = await this.staysRepository.findById(id);

    if (!stay) {
      throw new NotFoundException(`${id}에 해당하는 숙소가 없습니다.`);
    }

    return stay;
  }

  async create(data: Partial<Stay>): Promise<Stay> {
    return this.staysRepository.create(data);
  }

  async update(id: string, data: Partial<Stay>): Promise<Stay | null> {
    return this.staysRepository.update(id, data);
  }

  async remove(id: string): Promise<Stay | null> {
    return this.staysRepository.delete(id);
  }
}
