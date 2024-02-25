import { DRAW_RADIUS, Draw, ERASE_RADIUS } from '../../types/drawTypes';

export function drawLine({
  prevPoint,
  currPoint,
  ctx,
  drawingColor,
  actionType,
}: Draw) {
  let radius = 0;
  // switch between draw and eraser mode
  if (actionType === 'draw') {
    ctx.globalCompositeOperation = 'source-over';
    radius = DRAW_RADIUS;
  } else {
    ctx.globalCompositeOperation = 'destination-out';
    radius = ERASE_RADIUS;
  }

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
  ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
  ctx.fill();
}
