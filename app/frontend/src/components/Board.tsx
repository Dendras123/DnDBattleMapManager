import { useEffect, useRef, useState } from 'react';
import useDrawAndErase from '../hooks/useDrawAndErase';
import Toolbar from './Toolbar';
import { ActionType } from '../types/actionType';
import { DrawEvent, ERASER_CURSOR_SIZE, colors } from '../types/drawTypes';
import { drawLine } from '../utils/drawing/drawLine';
import { socket } from '../utils/socket/socketInstance';
import useJoinRoom from '../hooks/useJoinRoom';
import ImageUploadModal from './ImageUploadModal';
import ImageSelect from './ImageSelect';

export default function Board() {
  useJoinRoom();

  const [drawingColor, setDrawingColor] = useState(colors[0]);
  const [selectedAction, setSelectedAction] = useState<ActionType>('draw');
  const [images, setImages] = useState<HTMLImageElement[]>([]);

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
    // if not a new canvas => load state
    socket.on('get-canvas-state', (canvasState: string) => {
      const image = new Image();
      image.src = canvasState;
      image.onload = () => {
        ctx?.drawImage(image, 0, 0);
      };
    });

    // clean up sockets
    return () => {
      socket.removeAllListeners('draw');
      socket.removeAllListeners('get-canvas-state');
    };
  }, [canvasRef]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        pointerEvents: 'auto',
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
        <ImageUploadModal
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          setImages={setImages}
        />
        {images.map((image, index) => (
          <ImageSelect
            key={'image_' + index}
            image={image}
            selectedAction={selectedAction}
          />
        ))}
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          width={750}
          height={750}
          style={{
            border: '0.2rem solid gray',
            position: 'absolute',
            // this allows selecting the image which is behind the canvas
            pointerEvents: selectedAction === 'select' ? 'none' : 'auto',
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
