/* Audiova — service worker (PWA + cache moteur FFmpeg une fois chargé). */
const SHELL_CACHE = "audiova-shell-v1";
const ENGINE_CACHE = "audiova-engine-v1";
const SHELL_URLS = ["/", "/manifest.webmanifest", "/sw.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_URLS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== SHELL_CACHE && key !== ENGINE_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || data.type !== "CACHE_ENGINE") {
    return;
  }
  const urls = Array.isArray(data.urls) ? data.urls.filter((item) => typeof item === "string") : [];
  if (urls.length === 0) {
    return;
  }
  event.waitUntil(
    caches.open(ENGINE_CACHE).then((cache) =>
      Promise.all(urls.map((url) => cache.add(url).catch(() => undefined))),
    ),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  const isEngine = url.pathname.startsWith("/ffmpeg/");
  if (isEngine) {
    event.respondWith(
      caches.open(ENGINE_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) {
          return cached;
        }
        const response = await fetch(request);
        if (response.ok) {
          void cache.put(request, response.clone());
        }
        return response;
      }),
    );
    return;
  }

  if (url.pathname === "/" || url.pathname.startsWith("/outils")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            void caches.open(SHELL_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/"))),
    );
  }
});
