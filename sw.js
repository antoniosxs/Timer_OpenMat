// CADA VEZ QUE HAGAS UN CAMBIO EN EL HTML, CAMBIA ESTE NÚMERO (ej: v2, v3, v4...)
const CACHE_NAME = 'openmat-timer-v3.1'; 

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './OPENMAT LOGO BLANCO.png',
  './tv_bg.svg' 
];

// Instalar el SW y guardar en caché
self.addEventListener('install', event => {
  // Forzar al SW a activarse inmediatamente
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// ACTIVAR: Aquí es donde matamos el caché viejo
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Tomar el control de todas las pestañas abiertas inmediatamente
  self.clients.claim();
});

// FETCH: Usar caché cuando no hay internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );

});
