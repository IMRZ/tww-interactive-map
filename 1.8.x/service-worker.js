importScripts("/tww-interactive-map/1.8.x/precache-manifest.1c20a5aa9042e1979ed650448cf483bb.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* global workbox */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener('updated', () => {
  self.skipWaiting();
});

self.addEventListener('message', (event) => {
  if (event.data.action == 'skipWaiting') self.skipWaiting();
});

