import '../index.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import useAuth from './useAuth';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import EmptyPage from './pages/EmptyPage';
import SignupPage from './pages/SignupPage';
import routes from '../routes';

const AuthProvider = ({ children }) => {
  const auth = useAuth();
  const AuthContext = React.createContext({});

  return (
    <AuthContext.Provider value={auth}>
      { children }
    </AuthContext.Provider>
  );
};

const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Routes>
          <Route path={routes.mainPage} element={<MainPage />} />
          <Route path={routes.emptyPage} element={<EmptyPage />} />
          <Route path={routes.loginPage} element={<LoginPage />} />
          <Route path={routes.signupPage} element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </div>
    <ToastContainer />
  </AuthProvider>
);

export default App;
