import { useState } from 'react';
import Board from './components/Board';
import ColorPicker from './components/ColorPicker';

function App() {
  const [drawingColor, setDrawingColor] = useState('');

  return (
    <>
      <ColorPicker setDrawingColor={setDrawingColor} />
      <Board drawingColor={drawingColor} />
    </>
  );
}

export default App;
