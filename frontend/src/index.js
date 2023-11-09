import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import ReactDOM from 'react-dom/client';
import init from './init.jsx';

const app = async () => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_NOT_SECRET_TOKEN,
    environment: 'production',
  };
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        {await init()}
      </ErrorBoundary>
    </Provider>,
  );
};

app();
