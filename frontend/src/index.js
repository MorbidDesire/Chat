/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import store from './slices/index.js';
import init from './init.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from './slices/messageSlice.js'
import { addChannel, renameChannel, removeChannel, channelsSelectors } from './slices/channelsSlice.js';

export const socket = io('http://localhost:3000');

const Socket = () => {
  const dispatch = useDispatch();
  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });
  socket.on('renameChannel', (channel) => {
    dispatch(renameChannel(channel));
  });
  socket.on('removeChannel', (data) => {
    dispatch(removeChannel(data));
  });
};


const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <Provider store={store}>
      <Socket />
      {await init()}
    </Provider>,
  );
};

app();
