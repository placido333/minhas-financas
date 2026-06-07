/* Service worker do app Minhas Finanças.
   Estratégia: network-first (sempre tenta a versão mais nova quando online;
   usa o cache só quando estiver offline). Assim, atualizações aparecem sozinhas.
   IMPORTANTE: ao mudar o app, troque o número da VERSION abaixo (v1 -> v2 ...). */
const VERSION = 'v12';
const CACHE = 'financas-' + VERSION;
const ASSETS = ['./', './index.html', './manifest.webmanifest', './logo-mark.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {})));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  // Não interferir nos servidores do Firebase (login/banco em tempo real): deixa o navegador cuidar.
  const host = new URL(e.request.url).hostname;
  if (/googleapis\.com$/.test(host) && host !== 'fonts.googleapis.com') return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html')))
  );
});
