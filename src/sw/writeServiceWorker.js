const { readFileSync, writeFileSync } = require('fs');

const makeId = () => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return [...Array(10).keys()].reduce((id, i) => {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
    return id;
  }, '');
};

const assets = JSON.parse(readFileSync('./dist/public/manifest-asset.json', 'utf8'));

const CACHE_NAME = `static-cache-${makeId()}`;
const URLS_TO_CACHE = ['https://xn--5-3u6el60bxvj.com', ...Object.values(assets)];
const BASE = readFileSync('./src/sw/base.js').toString();
const SW = `(function() {
  "use strict";

  const CACHE_NAME = ${JSON.stringify(CACHE_NAME)};
  const URLS_TO_CACHE = ${JSON.stringify(URLS_TO_CACHE)};

  ${BASE}
})();`;

writeFileSync('./dist/public/service-worker.js', SW);
