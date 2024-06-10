import { SvgIconComponent } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { diceTypes, diceTypesAndIcons } from '../types/actionType';
import toast from 'react-hot-toast';

interface ToolbarIconDiceRollerProps {
  isSelected: boolean;
  onClick: () => void;
  CircleIcon: SvgIconComponent;
}

export default function ToolbarIconDiceRoller({
  isSelected,
  onClick,
  CircleIcon,
}: ToolbarIconDiceRollerProps) {
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
        aria-label="dice-roller"
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
        {diceTypes.map((dice) => {
          const DiceIcon = diceTypesAndIcons[dice];

          return (
            <MenuItem
              key={dice}
              onClick={() => {
                const roll = Math.floor(Math.random() * dice) + 1;

                toast('Roll: ' + roll, { position: 'bottom-center' });
              }}
            >
              <DiceIcon />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
