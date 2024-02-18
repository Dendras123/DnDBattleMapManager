import { useRef, useState } from 'react';
import useDraw from '../hooks/useDraw';
import Toolbar from './Toolbar';
import { ActionType } from '../types/actionType';

export default function Board({ drawingColor }: { drawingColor: string }) {
  const [selectedAction, setSelectedAction] = useState<ActionType>('draw');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { onMouseDownDraw } = useDraw({
    drawingColor,
    canvasRef,
    actionType: selectedAction,
  });

  const onMouseDown = onMouseDownDraw;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Toolbar
        selectedAction={selectedAction}
        setSelectedAction={setSelectedAction}
      />
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={750}
        height={750}
        style={{
          border: '0.2rem solid gray',
        }}
      />
    </div>
  );
}
