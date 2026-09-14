const CACHE_NAME = 'world-tour-v10-0';
const scopeUrl = new URL(self.registration.scope);
const appUrl = new URL('./', scopeUrl).href;
const indexUrl = new URL('index.html', scopeUrl).href;
const manifestUrl = new URL('manifest.webmanifest', scopeUrl).href;
const APP_SHELL = [appUrl, indexUrl, manifestUrl];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Supabase 등 외부 서비스 응답은 캐시에 저장하지 않습니다.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === 'navigate') return (await caches.match(indexUrl)) ?? (await caches.match(appUrl));
        return Response.error();
      })
  );
});
