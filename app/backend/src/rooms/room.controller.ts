import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
}
