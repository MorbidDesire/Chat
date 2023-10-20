import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import ReactDOM from 'react-dom/client';
import init from './init.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = async () => {
  function TestError() {
    const a = null;
    return a.hello();
  }
  const rollbarConfig = {
    accessToken: 'a875c529f7294495ab02a9cb0e65caa6',
    environment: 'production',
    captureUncaught: true,
    captureUnhandledRejections: true,
  };
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
        {await init()}
      </ErrorBoundary>
    </Provider>,
  );
};

app();
