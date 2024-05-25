import { useEffect } from 'react';
import { socket } from '../../utils/socket/socketInstance';
import {
  Position,
  SocketResCoordinates,
  UploadedImage,
} from '../../types/imageTypes';

interface UseJoinRoomParams {
  image: UploadedImage;
  setPosition: (position: Position) => void;
}

export default function useUpdatePosition({
  image,
  setPosition,
}: UseJoinRoomParams) {
  useEffect(() => {
    const updatePosition = (data: SocketResCoordinates) => {
      if (data.imageId !== image.id) {
        return;
      }

      setPosition(data.position);
    };

    socket.on('get-coordinates', updatePosition);

    return () => {
      socket.off('get-coordinates', updatePosition);
    };
  }, [image.id, setPosition]);
}
