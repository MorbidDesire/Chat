/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import store from './slices/index.js';
import init from './init.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { addMessage } from './slices/messageSlice.js'
import { addChannel } from './slices/channelsSlice.js';

export const socket = io('http://localhost:3000');

const Socket = () => {
  const dispatch = useDispatch();
  socket.on('newMessage', (message) => {
    console.log('new message');
    dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    console.log('new channel')
    dispatch(addChannel(channel))
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
