var cacheName = "esrijs-mapsapp-v1";
var filesToCache = [
  "./",
  // html files
  "./index.html",
  "./oauth-callback.html",
  // scripts
  "./app/main.js",
  "https://js.arcgis.com/4.5/dojo/nls/dojo_en-us.js",
  "https://js.arcgis.com/4.5/esri/views/MapView.js",
  "https://js.arcgis.com/4.5/esri/WebMap.js",
  // styles
  "./app/styles/main.css",
  // images
  "./assets/icons/icon-256x256.png",
  // fonts
  "https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/1.0.0-rc.6/fonts/calcite-ui.woff",
  "https://js.arcgis.com/4.5/esri/themes/base/icons/fonts/CalciteWebCoreIcons.ttf?erniwi",
  "https://js.arcgis.com/4.5/esri/themes/base/fonts/avenir-next/Avenir_Next_W00_400.woff2",
  "https://js.arcgis.com/4.5/esri/themes/base/fonts/avenir-next/Avenir_Next_W00_600.woff2"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches
      .open(cacheName)
      .then(function(cache) {
        return cache.addAll(filesToCache);
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== cacheName && key !== dataCacheName) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", function(event) {
  console.log("[Service Worker] Fetch", event.request.url);
  var allowedHosts = /(localhost|js\.arcgis\.com|jsonplaceholder\.typicode\.com|static\.arcgis\.com|s3-us-west-1\.amazonaws\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)/i,
    deniedAssets = /(sw\.js|sw-install\.js)$/i;
  if (
    allowedHosts.test(event.request.url) === true &&
    deniedAssets.test(event.request.url) === false
  ) {
    event.respondWith(
      caches.match(event.request).then(function(cachedResponse) {
        return (
          cachedResponse ||
          fetch(event.request).then(function(fetchedResponse) {
            var clonedResponse = fetchedResponse.clone();
            caches.open(cacheName).then(function(cache) {
              cache.put(event.request, clonedResponse);
            });
            return fetchedResponse;
          })
        );
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});
