const CACHE_NAME = 'openmat-timer-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './OPENMAT LOGO BLANCO.png'
];

// Instalar el Service Worker y guardar en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Usar el caché cuando no hay internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});