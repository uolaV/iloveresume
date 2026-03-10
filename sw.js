/* ═══════════════════════════════════════════════════════════════
   iloveresume — sw.js
   Service Worker · Cache-first strategy · Offline support

   ⚠️  VERSIONING: bump CACHE_VERSION on every deploy so users
   get fresh files immediately instead of serving stale cache.
═══════════════════════════════════════════════════════════════ */

// ↓ Increment this string on every deployment
const CACHE_VERSION = 'v6';
const CACHE_NAME = `iloveresume-${CACHE_VERSION}`;

const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './templates.js',
  './ats.js',
  './content-library.js',
  // CDN libs
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pako/2.1.0/pako.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.3/Sortable.min.js',
  // Only Inter loaded upfront — other fonts are lazy-loaded on demand
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS).catch(() => {}))
      .then(() => self.skipWaiting()) // activate immediately, don't wait for old SW to die
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    // Delete ALL previous cache versions — ensures stale files never linger
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k.startsWith('iloveresume-') && k !== CACHE_NAME)
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim()) // take control of open tabs immediately
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});
