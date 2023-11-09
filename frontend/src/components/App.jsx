import '../index.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import EmptyPage from './pages/EmptyPage';
import SignupPage from './pages/SignupPage';
import routes from '../routes';

const App = () => (
  <>
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Routes>
          <Route path={routes.mainPage} element={<MainPage />} />
          <Route path={routes.loginPage} element={<LoginPage />} />
          <Route path={routes.signupPage} element={<SignupPage />} />
          <Route path="*" element={<EmptyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
    <ToastContainer />
  </>
);

export default App;
