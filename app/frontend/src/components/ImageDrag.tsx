import {
  useRef,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useState,
} from 'react';
import { ActionType } from '../types/actionType';
import { Point } from '../types/drawTypes';

interface ImageDragProps {
  scaleRef: React.MutableRefObject<number>;
  scale: number;
  selectedAction: ActionType;
  isResizingRef: React.MutableRefObject<boolean>;
  children: ReactNode;
}

export default function ImageDrag({
  scaleRef,
  scale,
  selectedAction,
  isResizingRef,
  children,
}: ImageDragProps) {
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  let offset = { x: 0, y: 0 };

  const divRef = useRef<HTMLDivElement>(null);
  const div = divRef.current;

  const dragStart = (event: ReactMouseEvent) => {
    if (!div || selectedAction !== 'select') return;

    const rect = div.getBoundingClientRect();

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

    div.style.cursor = 'grab';
  };

  const dragMove = (event: MouseEvent) => {
    event.preventDefault();
    if (!div || isResizingRef.current) return;

    setPosition({
      x: event.clientX - offset.x,
      y: event.clientY - offset.y,
    });
  };

  const dragEnd = (event: MouseEvent) => {
    event.preventDefault();
    if (!div) return;

    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragEnd);

    div.style.cursor = 'default';
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
