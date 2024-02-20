export interface Point {
  x: number;
  y: number;
}

export interface Draw {
  prevPoint: Point | null;
  currPoint: Point;
  ctx: CanvasRenderingContext2D;
  drawingColor: string;
  radius: number;
}

export const DRAW_RADIUS = 2;
export const ERASE_RADIUS = 10;
export const ERASER_CURSOR_SIZE = 20;
