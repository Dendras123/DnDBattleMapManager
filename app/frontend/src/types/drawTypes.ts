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
