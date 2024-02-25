import { SvgIconComponent } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Circle as MuiCircleIcon } from '@mui/icons-material';
import { colors } from '../types/drawTypes';

interface ToolbarIconColorPickerProps {
  isSelected: boolean;
  onClick: () => void;
  CircleIcon: SvgIconComponent;
  setDrawingColor: React.Dispatch<React.SetStateAction<string>>;
}

export default function ToolbarIconColorPicker({
  isSelected,
  onClick,
  CircleIcon,
  setDrawingColor,
}: ToolbarIconColorPickerProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="brush"
        sx={{
          backgroundColor: isSelected ? '#403e3e' : 'transparent',
          transition: 'background-color 0.3s ease',
          ':hover': {
            backgroundColor: isSelected
              ? '#403e3e'
              : 'rgba(243, 240, 240, 0.8)',
          },
        }}
        onClick={(event) => {
          onClick();
          // only open popup menu if the item was already selected
          if (!isSelected) {
            return;
          }
          handleClick(event);
        }}
      >
        <CircleIcon sx={{ color: isSelected ? 'white' : 'gray' }} />
      </IconButton>
      {/* Drawing button has a popup color picker menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {colors.map((color) => (
          <MenuItem
            key={color}
            onClick={() => {
              setDrawingColor(color);
              handleClose();
            }}
          >
            <MuiCircleIcon sx={{ color: color }} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
