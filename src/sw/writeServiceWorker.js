const { readFileSync, writeFileSync } = require("fs");

const makeid = () => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const assets = JSON.parse(
  readFileSync("./dist/public/manifest-asset.json", "utf8")
);

const CACHE_NAME = `static-cache-${makeid()}`;
const URLS_TO_CACHE = [
  "https://xn--zb0bx62aj1dbwf.com",
  ...Object.values(assets)
];
const BASE = readFileSync("./src/sw/base.js").toString();
const SW = `(function() {
  "use strict";

  const CACHE_NAME = ${JSON.stringify(CACHE_NAME)};
  const URLS_TO_CACHE = ${JSON.stringify(URLS_TO_CACHE)};

  ${BASE}
})();`;

writeFileSync("./dist/public/service-worker.js", SW);
