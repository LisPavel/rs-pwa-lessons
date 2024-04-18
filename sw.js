const staticCacheKey = "static-site-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/css/materialize.min.css",
  "/css/styles.css",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v142/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];
// install sw
self.addEventListener("install", async (ev) => {
  const cache = await caches.open(staticCacheKey);
  await cache.addAll(ASSETS);
});

// activate sw
self.addEventListener("activate", async (ev) => {
  const cachesKeysArray = await caches.keys();
  console.log(cachesKeysArray);
  await Promise.all(
    cachesKeysArray
      .filter((k) => k !== staticCacheKey)
      .map((key) => caches.delete(key))
  );
});

// fetch event
self.addEventListener("fetch", (ev) => {
  ev.respondWith(
    caches.match(ev.request).then((cache) => {
      return cache || fetch(ev.request);
    })
  );
});
