import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesService } from './image.service';
import { Image } from './image.entity';
import { ImagesController } from './image.controller';
import { RoomsModule } from 'src/rooms/room.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), RoomsModule],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
