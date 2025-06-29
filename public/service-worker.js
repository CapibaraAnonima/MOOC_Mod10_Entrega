let cacheName = 'static-cache';

let cacheAssets = [
    '/index.html',
    '/game.html',
    '/highscores.html',

    '/app/libs/anime.min.js',
    '/app/main.js',
    '/app/install.js',
    '/manifest.json',
    '/app/libs/swiper.min.js',
    '/app/Game/Game.js',
    '/app/Game/Entity.js',
    '/app/Game/Character.js',
    '/app/Game/Player.js',
    '/app/Game/Opponent.js',
    '/app/Game/Shot.js',
    '/app/Game/utils.js',

    '/assets/css/main.css',
    '/assets/css/main.css.map',
    '/assets/css/materialdesignicons.css',
    '/assets/css/materialdesignicons.css.map',

    '/assets/img/characters/char_01.png',
    '/assets/img/characters/char_02.png',
    '/assets/img/characters/char_03.png',
    '/assets/img/bueno_muerto.png',
    '/assets/img/bueno.png',
    '/assets/img/game_over.png',
    '/assets/img/game.svg',
    '/assets/img/jefe_muerto.png',
    '/assets/img/jefe.png',
    '/assets/img/left_arrow.png',
    '/assets/img/malo_muerto.png',
    '/assets/img/malo.png',
    '/assets/img/shot1.png',
    '/assets/img/shot2.png',
    '/assets/img/you_win.png'
];

self.addEventListener('install', evt => {
    console.log('[ServiceWorker] - Instalando ServiceWorker');

    evt.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log(`[ServiceWorker] - Agregando ficheros a cache: ${cache}`);
            cache.addAll(cacheAssets)
                .then(() => self.skipWaiting()) // Activa el service-worker una vez completado
        })
    );
})

self.addEventListener('activate', evt => {
    console.log('[ServiceWorker] - Activando ServiceWorker');

    evt.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(
                    cache => {
                        if (cache !== cacheName) {
                            console.log('[ServiceWorker] - Clearing Old Cache');
                            return caches.delete(cache);
                        }
                    }
                )
            )
        })
    );
})

// Fetching - Offline primero
self.addEventListener('fetch', e => {
    console.log('[ServiceWorker] - Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            const resClone = res.clone();
            caches.open(cacheName)
                .then(cache => {
                    cache.put(e.request, resClone);
                });
            return res;
        }).catch(
            err => caches.match(e.request)
            .then(res => res)
        )
    );
});