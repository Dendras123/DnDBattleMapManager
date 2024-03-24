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
import { mkdirSync, unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { saveImageToStorage } from './image-storage';

@Controller('rooms')
export class RoomsController {
  @Post('save-state')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination(req, file, callback) {
          const folderName = file.originalname.slice(
            0,
            file.originalname.indexOf('.'),
          );
          const destinationPath = `./storage/${folderName}`;
          mkdirSync(destinationPath, { recursive: true });
          callback(null, destinationPath);
        },
        filename(req, file, callback) {
          const ext = extname(file.originalname);
          const fileName = 'canvasState' + ext;
          callback(null, fileName);
        },
      }),
    }),
  )
  saveState(@UploadedFile() image: Express.Multer.File) {
    console.log(image);

    return 'Canvas state saved!';
  }

  @Post(':id/image')
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

    const fileNameWithoutExtension = fileName.slice(0, fileName.indexOf('.'));

    return fileNameWithoutExtension;
  }

  @Delete(':id/image/:name')
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
