import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../utils/socket/socketInstance';

/**
 * Joins a room based on the roomId in the url.
 */
export default function useJoinRoom() {
  const params = useParams();
  const naivgate = useNavigate();

  useEffect(() => {
    if (params?.id) {
      socket.emit('joinRoom', params.id);
    } else {
      naivgate('/');
    }
  }, [naivgate, params.id]);
}
