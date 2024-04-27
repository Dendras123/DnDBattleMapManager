import {
  useRef,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useState,
} from 'react';
import { ActionType } from '../types/actionType';
import { Point } from '../types/drawTypes';
import { socket } from '../utils/socket/socketInstance';
import { Coordinates, UploadedImage } from '../types/imageTypes';
import { useParams } from 'react-router-dom';
import useUpdatePosition from '../hooks/socketListeners/useUpdatePosition';

interface ImageDragProps {
  scaleRef: React.MutableRefObject<number>;
  scale: number;
  selectedAction: ActionType;
  isResizingRef: React.MutableRefObject<boolean>;
  image: UploadedImage;
  children: ReactNode;
}

export default function ImageDrag({
  scaleRef,
  scale,
  selectedAction,
  isResizingRef,
  image,
  children,
}: ImageDragProps) {
  const params = useParams();
  const roomId = params.id ?? '0';

  const [position, _setPosition] = useState<Point>({ x: 0, y: 0 });
  const positionRef = useRef(position);
  const setPosition = (position: Point) => {
    positionRef.current = position;
    _setPosition(position);
  };
  let offset = { x: 0, y: 0 };

  const divRef = useRef<HTMLDivElement>(null);

  // websocket listener - get-coordinates
  useUpdatePosition({ image, setPosition });

  const dragStart = (event: ReactMouseEvent) => {
    if (!divRef.current || selectedAction !== 'select') return;

    const rect = divRef.current.getBoundingClientRect();

    const width = rect.left - rect.right;
    const originalWidth = width / scaleRef.current;

    const height = rect.top - rect.bottom;
    const originalHeight = height / scaleRef.current;

    // calculate offset of mouse from top left corner
    const x = event.clientX - rect.left + (width - originalWidth) / 2;
    const y = event.clientY - rect.top + (height - originalHeight) / 2;

    offset = { x, y };

    document.addEventListener('mousemove', dragMove, false);
    document.addEventListener('mouseup', dragEnd);

    divRef.current.style.cursor = 'grab';
  };

  const dragMove = (event: MouseEvent) => {
    event.preventDefault();
    if (!divRef.current || isResizingRef.current) return;

    setPosition({
      x: event.clientX - offset.x,
      y: event.clientY - offset.y,
    });
  };

  const dragEnd = (event: MouseEvent) => {
    event.preventDefault();
    if (!divRef.current) return;

    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragEnd);

    // send image coordinates over websocket
    const coordinates: Coordinates = {
      roomId: roomId,
      imageId: image.id,
      position: positionRef.current,
    };
    socket.emit('send-coordinates', coordinates);

    divRef.current.style.cursor = 'default';
  };

  return (
    <div
      ref={divRef}
      style={{
        left: 0,
        top: 0,
        position: 'absolute',
        userSelect: 'none',
        transform: `translateX(${position.x}px) translateY(${position.y}px) scale(${scale})`,
      }}
      onMouseDown={dragStart}
    >
      {children}
    </div>
  );
}
