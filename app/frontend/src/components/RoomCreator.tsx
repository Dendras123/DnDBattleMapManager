import { Button } from '@mui/material';
import { useEffect } from 'react';
import { socket } from '../utils/socket/socketInstance';
import { useNavigate } from 'react-router-dom';

export default function RoomCreator() {
  const navigate = useNavigate();

  // listen to websocket events
  useEffect(() => {
    const navigateToRoom = (roomId: string) => {
      navigate('map/' + roomId);
    };
    socket.on('room-created', navigateToRoom);

    return () => {
      socket.off('room-created', navigateToRoom);
    };
  }, [navigate]);

  return (
    <Button
      onClick={() => {
        socket.emit('create-room');
      }}
    >
      Create Map
    </Button>
  );
}
