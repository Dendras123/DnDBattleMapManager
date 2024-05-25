import { useRef, MouseEvent as ReactMouseEvent } from 'react';
import { ActionType } from '../types/actionType';
import { socket } from '../utils/socket/socketInstance';
import { useParams } from 'react-router-dom';
import { UploadedImage } from '../types/imageTypes';
import useUpdateScale from '../hooks/socketListeners/useUpdateScale';

interface ImageResizeProps {
  setIsResizing: (isResizing: boolean) => void;
  setScale: (scale: number) => void;
  scaleRef: React.MutableRefObject<number>;
  selectedAction: ActionType;
  image: UploadedImage;
}

export default function ImageResize({
  setIsResizing,
  setScale,
  scaleRef,
  selectedAction,
  image,
}: ImageResizeProps) {
  const params = useParams();
  const roomId = params.id ?? '0';

  const resizeRef = useRef<HTMLDivElement>(null);
  const resize = resizeRef.current;

  let initialPosition = { x: 0, y: 0 };

  // websocket listener - get-update-scale
  useUpdateScale({ image, setScale });

  const resizeStart = (event: ReactMouseEvent) => {
    if (!resize || selectedAction !== 'select') return;

    setIsResizing(true);

    const x = event.clientX;
    const y = event.clientY;
    initialPosition = { x, y };

    document.addEventListener('mousemove', resizeMove, false);
    document.addEventListener('mouseup', resizeEnd);
  };

  const resizeMove = (event: MouseEvent) => {
    event.preventDefault();
    if (!resize) return;

    if (
      event.clientX > initialPosition.x ||
      event.clientY > initialPosition.y
    ) {
      setScale(scaleRef.current + 0.005);
    } else {
      if (scaleRef.current > 0.3) {
        setScale(scaleRef.current - 0.005);
      }
    }
  };

  const resizeEnd = (event: MouseEvent) => {
    event.preventDefault();
    if (!resize) return;

    setIsResizing(false);

    socket.emit('send-update-scale', {
      roomId: roomId,
      imageId: image.id,
      scale: scaleRef.current,
    });

    document.removeEventListener('mousemove', resizeMove);
    document.removeEventListener('mouseup', resizeEnd);
  };

  return (
    <div
      id="resize-div"
      ref={resizeRef}
      onMouseDown={resizeStart}
      style={{
        userSelect: 'none',
        cursor: 'se-resize',
        minHeight: '10px',
        minWidth: '10px',
        position: 'absolute',
        right: '0',
        bottom: '0',
        transition: 'background 0.3s ease',
      }}
    />
  );
}
