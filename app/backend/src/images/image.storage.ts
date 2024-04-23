import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { randomUUID } from 'crypto';
import { mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB
const validMimeTypes: string[] = ['image/png', 'image/jpg', 'image/jpeg'];

export const saveImageToStorage: MulterOptions = {
  storage: diskStorage({
    destination(req, file, callback) {
      console.log(file);

      const folderName = req.params.id;
      const destinationPath = `./storage/${folderName}`;
      mkdirSync(destinationPath, { recursive: true });
      callback(null, destinationPath);
    },
    filename(req, file, callback) {
      const ext = extname(file.originalname);
      const uuid = randomUUID();
      const fileName = uuid + ext;
      callback(null, fileName);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!validMimeTypes.includes(file.mimetype)) {
      return callback(null, false);
    }

    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > MAX_FILE_SIZE_BYTES) {
      return callback(null, false);
    }

    callback(null, true);
  },
};
