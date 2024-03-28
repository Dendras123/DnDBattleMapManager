import { MouseEvent as ReactMouseEvent, ReactNode } from 'react';

interface ImageOutlineProps {
  children: ReactNode;
}

export default function ImageOutline({ children }: ImageOutlineProps) {
  // highlight border and options when mouse overing
  const mouseOver = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.borderColor = '#669df6';

    const resizeDiv = event.currentTarget.children.namedItem(
      'resize-div',
    ) as HTMLDivElement;

    if (resizeDiv) {
      resizeDiv.style.background = '#669df6';
    }
  };
  // disable highlight
  const mouseOut = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.borderColor = 'transparent';

    const resizeDiv = event.currentTarget.children.namedItem(
      'resize-div',
    ) as HTMLDivElement;

    if (resizeDiv) {
      resizeDiv.style.background = 'transparent';
    }
  };

  return (
    <div
      style={{
        border: '2px solid transparent',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
    >
      {children}
    </div>
  );
}
