import { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Draw {
  prevPoint: Point | null;
  currPoint: Point;
  ctx: CanvasRenderingContext2D;
  drawingColor: string;
}

function drawLine({ prevPoint, currPoint, ctx, drawingColor }: Draw) {
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

export default function useDraw({ drawingColor }: { drawingColor: string }) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<null | Point>(null);

  const onMouseDown = () => setIsMouseDown(true);

  useEffect(() => {
    const getRelativePosition = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      return { x, y };
    };

    const handler = (event: MouseEvent) => {
      if (!isMouseDown) {
        return;
      }
      const currPoint = getRelativePosition(event);

      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx || !currPoint) {
        return;
      }

      drawLine({ prevPoint: prevPoint.current, currPoint, ctx, drawingColor });
      prevPoint.current = currPoint;
    };

    const mouseUpHandler = () => {
      setIsMouseDown(false);
      prevPoint.current = null;
    };

    canvasRef.current?.addEventListener('mousemove', handler);
    window.addEventListener('mouseup', mouseUpHandler);

    return () => {
      canvasRef.current?.removeEventListener('mousemove', handler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [isMouseDown]);

  return { canvasRef, onMouseDown };
}
