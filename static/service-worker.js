const PRE_CACHE = "pre cache";
//pre cache all the files that you definitly want to have
const files = [
  "/offline",
  "/js/index.min.js",
  "/styles/index.min.css",
  "/img/food.webp",
];

// Install the service worker.
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(PRE_CACHE).then(cache => {
      self.skipWaiting();
      return cache.addAll(files);
    })
  );
});

// Activate service worker.
self.addEventListener("activate", _event => {});

// Fetch  service worker.
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Check if any of the requested files already exists
  if (event.request.method === "GET" && files.includes(url.pathname)) {
    event.respondWith(caches.open(PRE_CACHE).then(cache => cache.match(url)));

    // Only request the HTML, all the other files are already in the cache.
  } else if (
    event.request.method === "GET" &&
    event.request.headers.get("accept").includes("text/html")
  ) {
    event.respondWith(
      caches.open("dynamic-cache").then(cache => {
        return (
          cache
            .match(event.request)
            // Retrieve, cache and serve the HTML.
            .then(res => {
              const fetchFromServer = fetch(event.request).then(serverRes => {
                cache.put(event.request, serverRes.clone());
                return serverRes;
              });
              return res || fetchFromServer;
            })
            // Serve the offline page if not in cache and no internet.
            .catch(_e => {
              return caches
                .open(PRE_CACHE)
                .then(cache => cache.match("/offline"));
            })
        );
      })
    );
  }
});
