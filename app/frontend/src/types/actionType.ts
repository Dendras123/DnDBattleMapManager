import { SvgIconComponent } from '@mui/icons-material';
import BrushIcon from '@mui/icons-material/Brush';
import PanoramaHorizontalSelectIcon from '@mui/icons-material/PanoramaHorizontalSelect';

export type ActionType = 'draw' | 'erase';

export const actionTypes: ActionType[] = ['draw', 'erase'];

export const actionTypesAndIcons: Record<ActionType, SvgIconComponent> = {
  draw: BrushIcon,
  erase: PanoramaHorizontalSelectIcon,
};
