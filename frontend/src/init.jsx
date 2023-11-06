import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider, useDispatch } from 'react-redux';
import React from 'react';
import { socket } from './socket';
import store from './slices/index.js';
import App from './components/App';
import resources from './locales/index.js';
import { addMessage } from './slices/messageSlice.js';
import { addChannel, renameChannel, removeChannel } from './slices/channelsSlice.js';

const Socket = () => {
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
};

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Socket />
        <App />
      </Provider>
    </I18nextProvider>
  );
};

export default init;
