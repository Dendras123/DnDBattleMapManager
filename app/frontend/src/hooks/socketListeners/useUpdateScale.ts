import { useEffect } from 'react';
import { socket } from '../../utils/socket/socketInstance';
import { SocketResUpdateScale, UploadedImage } from '../../types/imageTypes';

interface UseUpdateScaleParams {
  image: UploadedImage;
  setScale: (scale: number) => void;
}

export default function useUpdateScale({
  image,
  setScale,
}: UseUpdateScaleParams) {
  useEffect(() => {
    const updateScale = (data: SocketResUpdateScale) => {
      if (data.imageId !== image.id) {
        return;
      }

      setScale(data.scale);
    };

    socket.on('get-update-scale', updateScale);

    return () => {
      socket.off('get-update-scale', updateScale);
    };
  }, [image.id, setScale]);
}
