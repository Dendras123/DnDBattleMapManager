import { Dispatch, SetStateAction, useEffect } from 'react';
import { socket } from '../../utils/socket/socketInstance';
import { SocketResRoom } from '../../types/roomType';

interface UseGetRoomProps {
  setRoomData: Dispatch<SetStateAction<SocketResRoom>>;
}

export default function useGetRoom({ setRoomData }: UseGetRoomProps) {
  useEffect(() => {
    socket.on('get-room-data', (roomData: SocketResRoom) => {
      setRoomData(roomData);
      document.title = `${roomData.name} - Battle Map Manager`;
    });

    // clean up listeners
    return () => {
      socket.removeAllListeners('get-room-data');
    };
  }, [setRoomData]);
}
