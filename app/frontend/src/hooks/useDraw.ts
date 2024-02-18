import { useEffect, useRef, useState } from 'react';
import { ActionType } from '../types/actionType';
import { Point } from '../types/drawTypes';
import { drawLine } from '../utils/drawing/drawLine';

export default function useDraw({
  drawingColor,
  canvasRef,
  actionType,
}: {
  drawingColor: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  actionType: ActionType;
}) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const prevPoint = useRef<null | Point>(null);

  const onMouseDownDraw = () => setIsMouseDown(true);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || actionType !== 'draw') {
      setIsMouseDown(false);
      return;
    }

    const getRelativePosition = (event: MouseEvent) => {
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

      const ctx = canvas.getContext('2d');
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

    canvas.addEventListener('mousemove', handler);
    window.addEventListener('mouseup', mouseUpHandler);

    return () => {
      canvas.removeEventListener('mousemove', handler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [isMouseDown, drawingColor, canvasRef, actionType]);

  return { canvasRef, onMouseDownDraw };
}
