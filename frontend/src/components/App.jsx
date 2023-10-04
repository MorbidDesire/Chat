/* eslint-disable */
import '../App.css';
import '../index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "@reactivers/use-auth";
import { LocalStorageProvider } from "@reactivers/use-local-storage";
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import EmptyPage from './pages/EmptyPage';

const App = () => {
  return (
    <LocalStorageProvider>
      <AuthProvider>
        <div className="d-flex flex-column h-100">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="*" element={<EmptyPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </LocalStorageProvider>
  );
};

export default App;
