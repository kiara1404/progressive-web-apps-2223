const PRE_CACHE = "pre cache";
//pre cache all the files that you definitly want to have
const files = [
  "/offline",
  "/js/index.js",
  "/styles/index.css",
  "/",

];

console.log("helloooo");

// Install the service worker.
self.addEventListener("install", event => {
  console.log("installation");
  
  event.waitUntil(
    console.log("files", files),
    
    caches.open(PRE_CACHE).then(cache => {
      self.skipWaiting();
      return cache.addAll(files);
    })
  );
});

// Activate service worker.
self.addEventListener("activate", _event => {console.log("activation")});

// Fetch  service worker.
self.addEventListener("fetch", event => {
  console.log("fetch");
  
  const url = new URL(event.request.url);

  // Check if any of the requested files already exists
  if (event.request.method === "GET" && files.includes(url.pathname)) {
    console.log("event = get and in pre cache");

    event.respondWith(caches.open(PRE_CACHE).then(cache => cache.match(url)));

    // Only request the HTML, all the other files are already in the cache.
  } else if (
    event.request.method === "GET" &&
    event.request.headers.get("accept").includes("text/html")
  ) {
    event.respondWith(
      caches.open("dynamic-cache").then(cache => {
        console.log("cache open");

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
