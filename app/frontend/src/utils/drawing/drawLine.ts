import { Draw } from '../../types/drawTypes';

export function drawLine({ prevPoint, currPoint, ctx, drawingColor }: Draw) {
  const { x: currX, y: currY } = currPoint;
  const lineWidth = 5;

  const startPoint = prevPoint ?? currPoint;
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = drawingColor;
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currX, currY);
  ctx.stroke();

  ctx.fillStyle = drawingColor;
  ctx.beginPath();
  ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
  ctx.fill();
}
