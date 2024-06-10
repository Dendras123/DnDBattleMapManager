import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Board from './components/Board';
import RoomCreator from './components/RoomCreator';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<RoomCreator />} />
          <Route path="/map/:id" element={<Board />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
