import { useEffect } from 'react';
import { socket } from '../../utils/socket/socketInstance';
import { deleteImage, loadImage } from '../../utils/drawing/manageImage';
import { SocketResImage, UploadedImage } from '../../types/imageTypes';

interface UseImagesParams {
  images: UploadedImage[];
  setImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}

/**
 * Handles socket events associated with images:
 * loading, creating, deleting
 */
export default function useImages({ images, setImages }: UseImagesParams) {
  useEffect(() => {
    // load in an image uploaded by another user
    socket.on('get-image', (sentImage: SocketResImage) => {
      loadImage(sentImage.base64Image).then((img) => {
        const uploadedImage: UploadedImage = {
          id: sentImage.id,
          name: sentImage.name,
          defaultPosition: sentImage.defaultPosition,
          defaultScale: sentImage.defaultScale,
          element: img,
        };

        setImages((prev) => [...prev, uploadedImage]);
      });
    });
    // delete the image from the client only
    socket.on('get-delete-image-client', (imageId: string) => {
      const imageToDelete = images.find((image) => image.id === imageId);

      if (imageToDelete) {
        deleteImage(imageToDelete.element.src, imageToDelete.id, setImages);
      }
    });
    // clean up listeners
    return () => {
      socket.removeAllListeners('get-image');
      socket.removeAllListeners('get-delete-image-client');
    };
  }, [images, setImages]);
}
