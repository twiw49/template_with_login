import { readFileSync, existsSync } from 'fs';

import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/core/styles';

import App from '../client/components/App';
import rootReducer from '../client/reducers';
import writeMeta from './writeMeta';

const renderPage = ({
  meta,
  cssMui,
  cssStyled,
  appString,
  preloadedState,
  mainJsUrl,
  mainCssUrl
}) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=0, user-scalable=0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta property="og:title" content="">
    <meta property="og:description" content="">
    <meta property="og:url" content="">
    ${meta}
    ${cssMui}
    ${cssStyled}
    ${mainCssUrl ? `<link rel="stylesheet" type="text/css" href=${mainCssUrl} />` : ''}
  </head>
  <body>
    <div id="root">${appString}</div>
  </body>
  <script id="preloaded-state">
    window.PRELOADED_STATE = ${preloadedState}     
  </script>
  <script src=${mainJsUrl}></script>
</html>
  `;
};

const renderHandler = (req, res) => {
  const manifestPath = './dist/public/manifest-asset.json';
  const manifest = existsSync(manifestPath) && JSON.parse(readFileSync(manifestPath, 'utf8'));

  const { initialState } = req;
  const store = createStore(rootReducer, initialState);
  const preloadedState = JSON.stringify(store.getState());

  const sheetMui = new ServerStyleSheets();
  const sheetStyled = new ServerStyleSheet();
  sheetStyled.collectStyles(App);

  const appString = renderToString(
    sheetMui.collect(
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    )
  );

  res.send(
    renderPage({
      meta: writeMeta(),
      cssStyled: sheetStyled.getStyleTags(),
      cssMui: `<style id='server-side-mui'>${sheetMui.toString()}</style>`,
      appString,
      preloadedState,
      mainJsUrl: manifest['main.js'],
      mainCssUrl: manifest['main.css']
    })
  );
};

export default renderHandler;
