import {
  BadRequestException,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from './image.storage';
import { ImagesService } from 'src/images/image.service';
import { unlinkSync } from 'fs';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post('room/:id')
  @UseInterceptors(FileInterceptor('images', saveImageToStorage))
  uploadImage(
    @UploadedFile()
    image: Express.Multer.File,
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
    const id = nameAndExtension[0];
    const originalName = image.originalname.slice(
      0,
      image.originalname.indexOf('.'),
    );
    const ext = nameAndExtension[1];

    this.imagesService.create({
      id: id,
      name: originalName,
      extension: ext,
    });

    return id;
  }

  @Delete(':name/room/:id')
  deleteImage(@Param('id') id: string, @Param('name') name: string) {
    // TODO: handle file types
    const path = `./storage/${id}/${name}.png`;

    try {
      unlinkSync(path);
      return 'Image deleted successfully!';
    } catch (error) {
      console.error(error.message);
      throw new BadRequestException('Image does not exist!');
    }
  }
}
