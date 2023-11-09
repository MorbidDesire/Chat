import '../index.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messageSlice.js';
import { addChannel, renameChannel, removeChannel } from '../slices/channelsSlice.js';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import EmptyPage from './pages/EmptyPage';
import SignupPage from './pages/SignupPage';
import routes from '../routes';
import { SocketContext } from '../context/index';

const App = () => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });
  socket.on('renameChannel', (channel) => {
    dispatch(renameChannel({ id: channel.id, changes: channel }));
  });
  socket.on('removeChannel', (data) => {
    dispatch(removeChannel(data.id));
  });
  return (
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
};

export default App;
