import useDraw from '../hooks/useDraw';

export default function Board({ drawingColor }: { drawingColor: string }) {
  const { canvasRef, onMouseDown } = useDraw({ drawingColor });

  return (
    <div>
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
