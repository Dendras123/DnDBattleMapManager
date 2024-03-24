import { SvgIconComponent } from '@mui/icons-material';
import {
  Brush,
  PanoramaHorizontalSelect,
  AddPhotoAlternate,
} from '@mui/icons-material';

export type ActionType = 'draw' | 'erase' | 'upload';

export const actionTypes: ActionType[] = ['draw', 'erase', 'upload'];

export const actionTypesAndIcons: Record<ActionType, SvgIconComponent> = {
  draw: Brush,
  erase: PanoramaHorizontalSelect,
  upload: AddPhotoAlternate,
};
