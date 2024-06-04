import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { socket } from '../utils/socket/socketInstance';
import { useNavigate } from 'react-router-dom';

export default function RoomCreator() {
  const navigate = useNavigate();

  // listen to room-created event
  useEffect(() => {
    const navigateToRoom = (roomId: string) => {
      navigate('map/' + roomId);
    };
    socket.on('room-created', navigateToRoom);

    return () => {
      socket.off('room-created', navigateToRoom);
    };
  }, [navigate]);

  // form data
  const [formData, setFormData] = useState({
    size: '1600x900',
    name: '',
  });
  const handleSizeChange = (event: SelectChangeEvent) => {
    setFormData((prevData) => ({
      ...prevData,
      size: event.target.value as string,
    }));
  };
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      name: event.target.value,
    }));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Typography
          style={{
            color: '#666666',
            fontSize: '24px',
            fontWeight: 600,
            textDecoration: 'underline #1976d2',
          }}
        >
          New room
        </Typography>
        <FormControl
          style={{
            width: '500px',
            gap: '10px',
          }}
        >
          <InputLabel id="select-size-label">Board size</InputLabel>
          <Select
            labelId="select-size-label"
            id="select-size"
            value={formData.size}
            label="Board size"
            onChange={handleSizeChange}
          >
            <MenuItem value={'1600x900'}>1600 x 900</MenuItem>
            <MenuItem value={'1200x600'}>1200 x 600</MenuItem>
            <MenuItem value={'900x500'}>900 x 500</MenuItem>
          </Select>
          <TextField
            id="room-name"
            label="Room name"
            variant="outlined"
            value={formData.name}
            onChange={handleNameChange}
          />

          <Button
            variant="contained"
            onClick={() => {
              socket.emit('create-room', formData);
            }}
          >
            Create room
          </Button>
        </FormControl>
      </div>
    </div>
  );
}
