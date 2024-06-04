import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { CreateRoomDto } from './room.types';

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

  async create(data: CreateRoomDto): Promise<Room> {
    const room = this.roomRepository.create();

    const size = data.size.split('x');
    room.width = parseInt(size[0]);
    room.height = parseInt(size[1]);

    const name = data.name.trim();
    if (name !== '') {
      room.name = name;
    }

    return this.roomRepository.save(room);
  }
}
