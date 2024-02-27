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
    socket.on('roomCreated', navigateToRoom);

    return () => {
      socket.off('roomCreated', navigateToRoom);
    };
  }, [navigate]);

  return (
    <Button
      onClick={() => {
        socket.emit('createRoom');
      }}
    >
      Create Map
    </Button>
  );
}
