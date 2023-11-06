import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import ReactDOM from 'react-dom/client';
import init from './init.jsx';
import FilterContext from './filterContext.js';

const FilterProvider = ({ children }) => {
  const dictionary = filter.add(filter.getDictionary('ru'));
  return (
    <FilterContext.Provider value={dictionary}>
      {children}
    </FilterContext.Provider>
  );
};

const app = async () => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_NOT_SECRET_TOKEN,
    environment: 'production',
  };
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <FilterProvider>
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          {await init()}
        </ErrorBoundary>
      </Provider>
    </FilterProvider>,
  );
};

app();
