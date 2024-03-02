import { useEffect, useRef, useState } from 'react';
import useDrawAndErase from '../hooks/useDrawAndErase';
import Toolbar from './Toolbar';
import { ActionType } from '../types/actionType';
import { DrawEvent, ERASER_CURSOR_SIZE, colors } from '../types/drawTypes';
import { drawLine } from '../utils/drawing/drawLine';
import { socket } from '../utils/socket/socketInstance';
import useJoinRoom from '../hooks/useJoinRoom';

export default function Board() {
  useJoinRoom();

  const [drawingColor, setDrawingColor] = useState(colors[0]);
  const [selectedAction, setSelectedAction] = useState<ActionType>('draw');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eraseDivRef = useRef<HTMLDivElement>(null);
  const { onMouseDown, isMouseDown } = useDrawAndErase({
    drawingColor,
    canvasRef,
    eraseDivRef,
    actionType: selectedAction,
  });
  // listen to websocket events
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

    // clean up sockets
    return () => {
      socket.removeAllListeners('draw');
    };
  }, [canvasRef]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Toolbar
        selectedAction={selectedAction}
        setSelectedAction={setSelectedAction}
        setDrawingColor={setDrawingColor}
      />
      <div
        style={{
          cursor:
            selectedAction === 'erase' && isMouseDown ? 'none' : 'default',
        }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          width={750}
          height={750}
          style={{
            border: '0.2rem solid gray',
          }}
        />
        <div
          ref={eraseDivRef}
          style={{
            height: ERASER_CURSOR_SIZE,
            width: ERASER_CURSOR_SIZE,
            position: 'absolute',
            left: '-10px',
            top: '-10px',
            borderRadius: '100%',
            backgroundColor: 'rgba(243, 240, 240, 0.9)',
            border: '3px solid gray',
            visibility: 'hidden',
          }}
        />
      </div>
    </div>
  );
}
