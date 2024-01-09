import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoomListPage from './components/pages/RoomListPage/RoomListPage';
import ChatPage from './components/pages/ChatPage/ChatPage';
import HomePage from './components/pages/HomePage/HomePage';
import { Providers } from './contexts/_Providers';

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/roomList" element={<RoomListPage />} />
          <Route exact path="/room/:id" element={<ChatPage />} />
        </Routes>
      </Providers>
    </BrowserRouter>
  );
}

export default App;
