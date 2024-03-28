import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  DeleteForever,
  MoreVert,
  VisibilityOff,
  North,
} from '@mui/icons-material';
import { useState } from 'react';
import { UploadedImage } from '../types/imageTypes';
import useDeleteImage from '../hooks/mutations/useDeleteImage';
import { useParams } from 'react-router-dom';
import { deleteImage } from '../utils/drawing/manageImage';

interface ImageMenuProps {
  image: UploadedImage;
  setImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}

export default function ImageMenu({ image, setImages }: ImageMenuProps) {
  const params = useParams();
  const roomId = params.id ?? '0';
  const deleteImageMutation = useDeleteImage();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        id="image-menu"
        style={{
          userSelect: 'none',
          minHeight: '10px',
          minWidth: '10px',
          position: 'absolute',
          right: '0',
          top: '0',
          transition: 'background 0.3s ease',
        }}
      >
        <IconButton disableRipple onClick={handleClick}>
          <MoreVert />
        </IconButton>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onMouseDown={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{ paper: { sx: { width: '200px' } } }}
      >
        <MenuItem>
          <ListItemIcon>
            <North fontSize="small" />
          </ListItemIcon>
          <ListItemText>Bring forward</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <North fontSize="small" style={{ transform: 'rotate(180deg)' }} />
          </ListItemIcon>
          <ListItemText>Bring backward</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <VisibilityOff fontSize="small" />
          </ListItemIcon>
          <ListItemText>Hide</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            deleteImageMutation.mutate({ roomId: roomId, imageId: image.id });
            deleteImage(image.element.src, image.id, setImages);
          }}
        >
          <ListItemIcon>
            <DeleteForever fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}