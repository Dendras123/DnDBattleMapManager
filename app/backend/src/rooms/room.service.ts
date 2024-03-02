import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  findOne(id: string): Promise<Room | null> {
    return this.roomRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.roomRepository.delete(id);
  }

  async create(): Promise<Room> {
    const room = this.roomRepository.create();
    return this.roomRepository.save(room);
  }
}
