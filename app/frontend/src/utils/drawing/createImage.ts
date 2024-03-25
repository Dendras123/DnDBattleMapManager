import { FilePondFile } from 'filepond';

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
  setImages: React.Dispatch<React.SetStateAction<HTMLImageElement[]>>,
) => {
  const src = URL.createObjectURL(file.file);
  loadImage(src).then((img) => {
    setImages((prev) => [...prev, img]);
  });
};
