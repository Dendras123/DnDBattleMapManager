import { ActionType } from './actionType';

export interface Point {
  x: number;
  y: number;
}

export interface Draw {
  prevPoint: Point | null;
  currPoint: Point;
  drawingColor: string;
  actionType: ActionType;
}
