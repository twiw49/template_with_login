import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './client/reducers';
import App from './client/components/App';
import persistMiddleware from './middleware/persistMiddleware';

const env = process.env.NODE_ENV;

const middlewares = [persistMiddleware];

if (env === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
} else if (env === 'production') {
  // const registerServiceWorker = require('./sw/registerServiceWorker');
  // registerServiceWorker();
}

const preloadedState = window.PRELOADED_STATE;
delete window.PRELOADED_STATE;

const store =
  env === 'development'
    ? createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(...middlewares)))
    : createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
