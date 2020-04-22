self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener('message', (event) => {
  if (event.data.action == 'skipWaiting') self.skipWaiting();
});
