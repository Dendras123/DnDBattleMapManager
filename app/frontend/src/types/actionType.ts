/// <reference types="vite-plugin-svgr/client" />
import { SvgIconComponent } from '@mui/icons-material';
import {
  Brush,
  PanoramaHorizontalSelect,
  AddPhotoAlternate,
  BackHand,
  Casino,
} from '@mui/icons-material';
import d4Icon from '../assets/d4.svg?react';
import d6Icon from '../assets/d6.svg?react';
import d8Icon from '../assets/d8.svg?react';
import d10Icon from '../assets/d10.svg?react';
import d12Icon from '../assets/d12.svg?react';
import d20Icon from '../assets/d20.svg?react';

export type ActionType = 'draw' | 'erase' | 'upload' | 'select' | 'rollDice';

export const actionTypes: ActionType[] = [
  'draw',
  'erase',
  'upload',
  'select',
  'rollDice',
];

export const actionTypesAndIcons: Record<ActionType, SvgIconComponent> = {
  draw: Brush,
  erase: PanoramaHorizontalSelect,
  upload: AddPhotoAlternate,
  select: BackHand,
  rollDice: Casino,
};

export const diceTypes: number[] = [4, 6, 8, 10, 12, 20, 100];

export const diceTypesAndIcons: Record<
  number,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  4: d4Icon,
  6: d6Icon,
  8: d8Icon,
  10: d10Icon,
  12: d12Icon,
  20: d20Icon,
  100: d10Icon,
};
