/* eslint-disable */
import '../App.css';
import '../index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import EmptyPage from './pages/EmptyPage';
import UserProvider from './UserProvider';

const App = () => {
  return (
    <UserProvider>
      <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<EmptyPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
      </div>
    </UserProvider>
  );
};

export default App;
