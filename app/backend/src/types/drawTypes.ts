import { ActionType } from './actionType';

export interface Point {
  x: number;
  y: number;
}

export interface DrawEvent {
  prevPoint: Point | null;
  currPoint: Point;
  drawingColor: string;
  actionType: ActionType;
  roomId: string;
}
