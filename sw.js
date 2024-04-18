// install sw
self.addEventListener("install", (ev) => {
  console.log("service worker has been installed", ev);
});

// activate sw
self.addEventListener("activate", (ev) => {
  console.log("service worker has been activated", ev);
});

// fetch event
self.addEventListener("fetch", (ev) => {
  console.log("fetch", ev.request.url);
})