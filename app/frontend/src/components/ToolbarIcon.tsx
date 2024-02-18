import { SvgIconComponent } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface ToolbarIconProps {
  isSelected: boolean;
  onClick: () => void;
  CircleIcon: SvgIconComponent;
}

export default function ToolbarIcon({
  isSelected,
  onClick,
  CircleIcon,
}: ToolbarIconProps) {
  return (
    <IconButton
      aria-label="brush"
      sx={{
        backgroundColor: isSelected ? '#403e3e' : 'transparent',
        transition: 'background-color 0.3s ease',
        ':hover': {
          backgroundColor: isSelected ? '#403e3e' : 'rgba(243, 240, 240, 0.8)',
        },
      }}
      onClick={onClick}
    >
      <CircleIcon sx={{ color: isSelected ? 'white' : 'gray' }} />
    </IconButton>
  );
}
