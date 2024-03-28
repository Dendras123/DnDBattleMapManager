import { FilePondFile } from 'filepond';
import { UploadedImage } from '../../types/imageTypes';

const loadImage = (src: string) => {
  return new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.addEventListener(
      'load',
      () => {
        resolve(img);
      },
      false,
    );

    img.src = src;
  });
};

export const createImage = (
  file: FilePondFile,
  setImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>,
) => {
  const src = URL.createObjectURL(file.file);
  loadImage(src).then((img) => {
    const uploadedImage: UploadedImage = {
      id: file.serverId,
      name: file.filenameWithoutExtension,
      element: img,
    };

    setImages((prev) => [...prev, uploadedImage]);
  });
};

export const deleteImage = (
  url: string,
  imageId: string,
  setImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>,
) => {
  URL.revokeObjectURL(url);
  setImages((prev) => prev.filter((image) => image.id !== imageId));
};
