import { useRef, useState } from 'react';
import useDrawAndErase from '../hooks/useDrawAndErase';
import Toolbar from './Toolbar';
import { ActionType } from '../types/actionType';
import { ERASER_CURSOR_SIZE } from '../types/drawTypes';

export default function Board() {
  const [drawingColor, setDrawingColor] = useState('');
  const [selectedAction, setSelectedAction] = useState<ActionType>('draw');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eraseDivRef = useRef<HTMLDivElement>(null);
  const { onMouseDown, isMouseDown } = useDrawAndErase({
    drawingColor,
    canvasRef,
    eraseDivRef,
    actionType: selectedAction,
  });

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
