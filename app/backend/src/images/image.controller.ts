import {
  BadRequestException,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from './image.storage';
import { ImagesService } from 'src/images/image.service';
import { unlinkSync } from 'fs';
import { RoomsService } from 'src/rooms/room.service';

@Controller('images')
export class ImagesController {
  constructor(
    private imagesService: ImagesService,
    private roomsService: RoomsService,
  ) {}

  @Post('room/:id')
  @UseInterceptors(FileInterceptor('images', saveImageToStorage))
  async uploadImage(
    @Param('id') roomId: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const fileName = image?.filename;
    // if the validation (validation inside saveImageToStorage) failed return with 422
    if (!fileName) {
      throw new HttpException(
        'File validation failed!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const nameAndExtension = fileName.split('.');
    const imageId = nameAndExtension[0];
    const originalName = image.originalname.slice(
      0,
      image.originalname.indexOf('.'),
    );
    const ext = nameAndExtension[1];

    const room = await this.roomsService.findOne(roomId);
    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }

    this.imagesService.create({
      id: imageId,
      name: originalName,
      extension: ext,
      position: { x: 0, y: 0, z: 0 },
      room: room,
    });

    return imageId;
  }

  @Delete(':imageId/room/:roomId')
  async deleteImage(
    @Param('imageId') imageId: string,
    @Param('roomId') roomId: string,
  ) {
    try {
      const image = await this.imagesService.findOne(imageId);

      if (!image) {
        throw new Error(`Image with ID ${imageId} does not exist.`);
      }

      // delete image from storage and database
      const path = `./storage/${roomId}/${imageId}.${image.extension}`;
      unlinkSync(path);
      this.imagesService.remove(imageId);

      return 'Image deleted successfully!';
    } catch (error) {
      console.error(error.message);
      throw new BadRequestException('Image does not exist!');
    }
  }
}
