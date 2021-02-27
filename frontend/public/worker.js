var CACHE_NAME = 'frontend';
var urlsToCache = [
    '/',
    '/:id/home',
    '/:id/social',
    '/:id/edit_profile',
    '/login',
    '/signup',
    './index.html',
    './logo192.png',
    './logo512.png',
    './favicon.ico',
    '../src/static/images/bg5.png',
    '../src/static/images/bg6.png',
    '../src/static/css/Landing.css',
    '../src/static/css/styles.css'
];
// Install a service worker
self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});
// Cache and return requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
// Update a service worker
self.addEventListener('activate', event => {
    var cacheWhitelist = ['frontend'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});