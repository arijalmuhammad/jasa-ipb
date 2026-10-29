// Service worker Jasa IPB (v202610291444): kerangka aplikasi tersedia offline; data selalu diambil langsung dari Sheet (tidak di-cache di sini).
const CACHE = 'jasaipb-v202610291444';
const KERANGKA = ['./', 'index.html', 'teman.html', 'manifest.webmanifest', 'ikon-192.png', 'ikon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(KERANGKA)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;          // Apps Script & font: langsung ke jaringan
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('index.html'))));
});
