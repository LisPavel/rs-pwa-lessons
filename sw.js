const staticCacheKey = "static-site";

const ASSETS = [
  "/",
  "/index.html",
  "/css/materialize.min.css",
  "/css/styles.css",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
];
// install sw
self.addEventListener("install", async (ev) => {
  const cache = await caches.open(staticCacheKey);
  await cache.addAll(ASSETS);
});

// activate sw
self.addEventListener("activate", (ev) => {
  console.log("service worker has been activated", ev);
});

// fetch event
self.addEventListener("fetch", (ev) => {
  console.log("fetch", ev.request.url);
});
