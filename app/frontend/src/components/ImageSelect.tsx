import { useRef, useState, MouseEvent as ReactMouseEvent } from 'react';
import { Point } from '../types/drawTypes';
import { ActionType } from '../types/actionType';

interface ImageSelectProps {
  image: HTMLImageElement;
  selectedAction: ActionType;
}
// REFACT THIS
export default function ImageSelect({
  image,
  selectedAction,
}: ImageSelectProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const div = divRef.current;
  let offset = { x: 0, y: 0 };
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });

  const [scale, _setScale] = useState(1);
  // Create a ref
  const scaleRef = useRef(scale);
  // And create our custom function in place of the original setActivePoint
  function setScale(scale: number) {
    scaleRef.current = scale; // Updates the ref
    _setScale(scale);
  }
  const resizeRef = useRef<HTMLDivElement>(null);
  const resize = resizeRef.current;
  let initialPosition = { x: 0, y: 0 };
  let isResizing = false;

  const dragStart = (event: ReactMouseEvent) => {
    if (!div || selectedAction !== 'select') return;

    const rect = div.getBoundingClientRect();

    const width = rect.left - rect.right;
    const originalWidth = width / scaleRef.current;

    const height = rect.top - rect.bottom;
    const originalHeight = height / scaleRef.current;

    // (original width - scaled width) / 2
    console.log((width - originalWidth) / 2);

    const x = event.clientX - rect.left + (width - originalWidth) / 2;
    const y = event.clientY - rect.top + (height - originalHeight) / 2;

    offset = { x, y };

    document.addEventListener('mousemove', dragMove, false);
    document.addEventListener('mouseup', dragEnd);

    div.style.cursor = 'grab';
  };

  const dragMove = (event: MouseEvent) => {
    event.preventDefault();
    if (!div || isResizing) return;

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

  const resizeStart = (event: ReactMouseEvent) => {
    if (!resize || selectedAction !== 'select') return;

    isResizing = true;

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

    isResizing = false;

    document.removeEventListener('mousemove', resizeMove);
    document.removeEventListener('mouseup', resizeEnd);
  };

  const mouseOver = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.borderColor = '#669df6';
    if (resizeRef.current) {
      resizeRef.current.style.background = '#669df6';
    }
  };

  const mouseOut = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.borderColor = 'transparent';
    if (resizeRef.current) {
      resizeRef.current.style.background = 'transparent';
    }
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
      <div
        style={{
          border: '2px solid transparent',
          transition: 'border-color 0.3s ease',
        }}
        onMouseEnter={mouseOver}
        onMouseLeave={mouseOut}
      >
        <img style={{ display: 'block' }} src={image.src} draggable={false} />
        <div
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
      </div>
    </div>
  );
}
