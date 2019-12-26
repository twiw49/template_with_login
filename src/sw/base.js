self.addEventListener('install', e => {
  const onInstalled = caches
    .open(CACHE_NAME)
    .then(cache => cache.addAll(URLS_TO_CACHE))
    .then(() => self.skipWaiting());

  e.waitUntil(onInstalled);
});

self.addEventListener('activate', e => {
  const onActivated = caches.keys().then(keyList => keyList.map(key => caches.delete(key)));
  // .then(() => self.clients.claim());

  e.waitUntil(onActivated);
});

self.addEventListener('fetch', e => {
  if (e.request.url.match(/(s3.ap-northeast-2.amazonaws.com)/)) cacheWithNetworkFallback(e);
});

// CACHE STRATEGIES
// 1. Cache only. Static assets - App Shell
const cacheOnly = e => {
  e.respondWith(caches.match(e.request));
};

// 2. Cache with Network Fallback
const cacheWithNetworkFallback = e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      if (response) return response;

      // Fallback
      return fetch(e.request).then(newResponse => {
        // Cache fetched response
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, newResponse));
        return newResponse.clone();
      });
    })
  );
};

// 3. Network with Cache fallback
const networkWithCacheFallback = e => {
  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Cache latest version
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, response));
        return response.clone();
      })
      .catch(err => caches.match(e.request))
  );
};

// 4. Cache with Network Update
const cacheWithNetworkUpdate = e => {
  e.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      // Return from cache
      return cache.match(e.request).then(response => {
        // Update
        const updateResponse = fetch(e.request).then(newResponse => {
          //Cache new response
          cache.put(e.request, newResponse.clone());
          return newResponse;
        });

        return response || updateResponse;
      });
    })
  );
};

// 5. Cache & Network Race with offline content
const cacheAndNetworkRace = e => {
  e.respondWith(
    new Promise((resolve, reject) => {
      // Track rejections
      let firstRejectionReceived = false;
      let rejectOnce = () => {
        if (firstRejectionReceived) {
          reject('No response received.');
        } else {
          firstRejectionReceived = true;
        }
      };

      // Try Network
      fetch(e.request)
        .then(response => {
          // Check res ok
          response.ok ? resolve(response) : rejectOnce();
        })
        .catch(rejectOnce);

      // Try Cache
      caches
        .match(e.request)
        .then(response => {
          // Check cache found
          response ? resolve(response) : rejectOnce();
        })
        .catch(rejectOnce);
    })
  );
};
