import { SvgIconComponent } from '@mui/icons-material';
import {
  Brush,
  PanoramaHorizontalSelect,
  AddPhotoAlternate,
  BackHand,
} from '@mui/icons-material';

export type ActionType = 'draw' | 'erase' | 'upload' | 'select';

export const actionTypes: ActionType[] = ['draw', 'erase', 'upload', 'select'];

export const actionTypesAndIcons: Record<ActionType, SvgIconComponent> = {
  draw: Brush,
  erase: PanoramaHorizontalSelect,
  upload: AddPhotoAlternate,
  select: BackHand,
};
