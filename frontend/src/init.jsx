/* eslint-disable */
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider, useDispatch } from 'react-redux';
import React from 'react';
import store from './slices/index.js';
import App from './components/App';
import resources from './locales/index.js';
import FilterProvider from './context/FilterProvider';
import AuthProvider from './context/AuthProvider';
import SocketProvider from './context/SocketProvider';

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });
  return (
    <SocketProvider>
      <AuthProvider>
        <FilterProvider>
          <I18nextProvider i18n={i18n}>
            <Provider store={store}>
              <App />
            </Provider>
          </I18nextProvider>
        </FilterProvider>
      </AuthProvider>
    </SocketProvider>
  );
};

export default init;
