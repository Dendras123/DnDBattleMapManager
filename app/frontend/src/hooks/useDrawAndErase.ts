import { useEffect, useRef, useState } from 'react';
import { ActionType } from '../types/actionType';
import { DRAW_RADIUS, ERASE_RADIUS, Point } from '../types/drawTypes';
import { drawLine } from '../utils/drawing/drawLine';

export default function useDrawAndErase({
  drawingColor,
  canvasRef,
  eraseDivRef,
  actionType,
}: {
  drawingColor: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  eraseDivRef: React.RefObject<HTMLDivElement>;
  actionType: ActionType;
}) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const prevPoint = useRef<null | Point>(null);

  const onMouseDown = () => setIsMouseDown(true);

  useEffect(() => {
    const acceptedActions: ActionType[] = ['draw', 'erase'];
    const canvas = canvasRef.current;
    const eraseDiv = eraseDivRef.current;
    // return if canvas, eraseDiv is not defined or not draw or erase is selected
    if (!canvas || !acceptedActions.includes(actionType) || !eraseDiv) {
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

      // if globalCompositeOperation is set to destination-out it will erase the canvas, if source-over it will draw
      let radius = 0;
      if (actionType === 'draw') {
        ctx.globalCompositeOperation = 'source-over';
        radius = DRAW_RADIUS;
      } else {
        ctx.globalCompositeOperation = 'destination-out';
        radius = ERASE_RADIUS;
        // display the eraser cursor
        eraseDiv.style.cursor = 'none';
        eraseDiv.style.visibility = 'visible';
        eraseDiv.style.transform =
          'translate(' + event.clientX + 'px,' + event.clientY + 'px)';
      }

      drawLine({
        prevPoint: prevPoint.current,
        currPoint,
        ctx,
        drawingColor,
        radius,
      });
      prevPoint.current = currPoint;
    };

    const mouseUpHandler = () => {
      setIsMouseDown(false);
      eraseDiv.style.visibility = 'hidden';
      prevPoint.current = null;
    };

    canvas.addEventListener('mousemove', handler);
    window.addEventListener('mouseup', mouseUpHandler);

    return () => {
      canvas.removeEventListener('mousemove', handler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [isMouseDown, drawingColor, canvasRef, eraseDivRef, actionType]);

  return { onMouseDown, isMouseDown };
}
