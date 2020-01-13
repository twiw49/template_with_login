import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

import rootReducer from './client/reducers';
import App from './client/components/App';
import persistMiddleware from './middleware/persistMiddleware';
import { register } from './sw/registerServiceWorker';

const env = process.env.NODE_ENV;

const middlewares = [persistMiddleware];

if (env === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
} else if (env === 'production') {
  register();
}

const preloadedState = window.PRELOADED_STATE;
delete window.PRELOADED_STATE;

const store =
  env === 'development'
    ? createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(...middlewares)))
    : createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: 'jss-insertion-point'
});

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <StylesProvider jss={jss}>
        <App />
      </StylesProvider>
      ;
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
