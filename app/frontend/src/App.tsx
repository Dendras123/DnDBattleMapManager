import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Board from './components/Board';
import RoomCreator from './components/RoomCreator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoomCreator />} />
        <Route path="/map/:id" element={<Board />} />
      </Routes>
    </Router>
  );
}

export default App;
