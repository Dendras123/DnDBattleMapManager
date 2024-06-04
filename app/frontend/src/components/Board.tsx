import { useRef, useState } from 'react';
import useDrawAndErase from '../hooks/useDrawAndErase';
import Toolbar from './Toolbar';
import { ActionType } from '../types/actionType';
import { ERASER_CURSOR_SIZE, colors } from '../types/drawTypes';
import useJoinRoom from '../hooks/socketListeners/useJoinRoom';
import ImageUploadModal from './ImageUploadModal';
import ImageSelect from './ImageSelect';
import { UploadedImage } from '../types/imageTypes';
import useImages from '../hooks/socketListeners/useImages';
import useCanvas from '../hooks/socketListeners/useCanvas';

export default function Board() {
  useJoinRoom();

  const [drawingColor, setDrawingColor] = useState(colors[0]);
  const [selectedAction, setSelectedAction] = useState<ActionType>('draw');
  const [images, setImages] = useState<UploadedImage[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eraseDivRef = useRef<HTMLDivElement>(null);
  const { onMouseDown, isMouseDown } = useDrawAndErase({
    drawingColor,
    canvasRef,
    eraseDivRef,
    actionType: selectedAction,
  });
  // listen to websocket events
  useImages({ images, setImages });
  useCanvas({ canvasRef });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
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
          images={images}
          setImages={setImages}
        />
        {images.map((image) => (
          <ImageSelect
            key={image.id}
            image={image}
            selectedAction={selectedAction}
            setImages={setImages}
          />
        ))}
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          width={750}
          height={750}
          style={{
            border: '0.1rem solid gray',
            position: 'absolute',
            left: 0,
            right: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
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
