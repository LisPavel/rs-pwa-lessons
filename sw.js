const staticCacheKey = "static-site-v2";
const dynamicCacheKey = "dynamic-site-v2";

const ASSETS = [
  "/",
  "/index.html",
  "/offline.html",
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
      .filter((k) => k !== staticCacheKey && k !== dynamicCacheKey)
      .map((key) => caches.delete(key))
  );
});

// fetch event
self.addEventListener("fetch", (ev) => {
  ev.respondWith(cacheFirst(ev.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  try {
    return (
      cached ??
      (await fetch(request).then((response) => {
        console.log("response", response);
        return networkFirst(request);
      }))
    );
  } catch (error) {
    return networkFirst(request);
  }
}

async function networkFirst(request) {
  console.log("networkFirst");
  const cache = await caches.open(dynamicCacheKey);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    return cached ?? (await caches.match("/offline.html"));
  }
}
