import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';
import { CoordinatesDto, CreateImage } from './image.types';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  findAll(): Promise<Image[]> {
    return this.imageRepository.find();
  }

  findOne(id: string): Promise<Image | null> {
    return this.imageRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.imageRepository.delete(id);
  }

  async create(data: CreateImage): Promise<Image> {
    const image = this.imageRepository.create();
    image.id = data.id;
    image.name = data.name;
    image.extension = data.extension;
    image.position = data.position;
    image.room = data.room;

    return this.imageRepository.save(image);
  }

  async saveCoordinates(data: CoordinatesDto): Promise<Image> {
    const image = await this.findOne(data.imageId);

    if (!image) {
      throw new Error(`Image with ID ${data.imageId} does not exist.`);
    }

    image.position = {
      x: data.position.x,
      y: data.position.y,
      z: image.position.z,
    };
    return this.imageRepository.save(image);
  }

  save(image: Image): Promise<Image> {
    return this.imageRepository.save(image);
  }
}
