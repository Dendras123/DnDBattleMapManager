import { useEffect } from 'react';
import { socket } from '../../utils/socket/socketInstance';
import { DrawEvent } from '../../types/drawTypes';
import { drawLine } from '../../utils/drawing/drawLine';

interface UseCanvasParams {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

/**
 * Handles socket events associated with canvas:
 * drawing, loading canvas state
 */
export default function useCanvas({ canvasRef }: UseCanvasParams) {
  useEffect(() => {
    const ctx = canvasRef?.current?.getContext('2d');
    // update the canvas after draw event
    socket.on('draw', (res: DrawEvent) => {
      if (!ctx) {
        return;
      }
      const { prevPoint, currPoint, drawingColor, actionType } = res.data;
      drawLine({ prevPoint, currPoint, ctx, drawingColor, actionType });
    });
    // if not a new canvas => load state
    socket.on('get-canvas-state', (canvasState: string) => {
      const image = new Image();
      image.src = canvasState;
      image.onload = () => {
        ctx?.drawImage(image, 0, 0);
      };
    });

    // clean up listeners
    return () => {
      socket.removeAllListeners('draw');
      socket.removeAllListeners('get-canvas-state');
    };
  }, [canvasRef]);
}
