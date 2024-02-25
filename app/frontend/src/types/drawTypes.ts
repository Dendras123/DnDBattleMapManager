import { ActionType } from './actionType';

export interface Point {
  x: number;
  y: number;
}

export interface Draw {
  prevPoint: Point | null;
  currPoint: Point;
  ctx: CanvasRenderingContext2D;
  drawingColor: string;
  actionType: ActionType;
}

export interface DrawEvent {
  data: Omit<Draw, 'ctx'>;
}

export const DRAW_RADIUS = 2;
export const ERASE_RADIUS = 10;
export const ERASER_CURSOR_SIZE = 20;

export const colors = ['#000000', '#DC143C', '#32CD32', '#1E90FF', '#FFD700'];
