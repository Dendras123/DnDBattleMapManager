import { useEffect, useRef, useState } from 'react';
import { ActionType } from '../types/actionType';
import { Draw, Point } from '../types/drawTypes';
import { drawLine } from '../utils/drawing/drawLine';
import { socket } from '../utils/socket/socketInstance';
import { useParams } from 'react-router-dom';
import useSaveState from './useSaveState';

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
  const mutation = useSaveState();
  const params = useParams();
  const roomId = params.id;
  const [isMouseDown, setIsMouseDown] = useState(false);
  const prevPoint = useRef<null | Point>(null);

  const onMouseDown = () => setIsMouseDown(true);

  useEffect(() => {
    // draws a line and emits draw event - every other client will get the data
    const socketDrawLine = ({
      prevPoint,
      currPoint,
      ctx,
      drawingColor,
      actionType,
    }: Draw) => {
      socket.emit('draw', {
        prevPoint,
        currPoint,
        drawingColor,
        actionType,
        roomId,
      });
      drawLine({ prevPoint, currPoint, ctx, drawingColor, actionType });
    };

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

      // display the eraser cursor
      if (actionType === 'erase') {
        eraseDiv.style.cursor = 'none';
        eraseDiv.style.visibility = 'visible';
        eraseDiv.style.transform =
          'translate(' + event.clientX + 'px,' + event.clientY + 'px)';
      }

      socketDrawLine({
        prevPoint: prevPoint.current,
        currPoint,
        ctx,
        drawingColor,
        actionType,
      });
      prevPoint.current = currPoint;
    };

    const mouseUpHandler = () => {
      setIsMouseDown(false);
      // hide eraser cursor
      eraseDiv.style.visibility = 'hidden';
      prevPoint.current = null;
      // save canvas satate to png
      const dataUrl = canvas.toDataURL('image/png');
      mutation.mutate({ dataUrl: dataUrl, fileName: roomId + '.png' });
    };

    canvas.addEventListener('mousemove', handler);
    window.addEventListener('mouseup', mouseUpHandler);

    return () => {
      canvas.removeEventListener('mousemove', handler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [
    isMouseDown,
    drawingColor,
    canvasRef,
    eraseDivRef,
    actionType,
    roomId,
    mutation,
  ]);

  return { onMouseDown, isMouseDown };
}
