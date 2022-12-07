self.addEventListener("install", e => {
	self.skipWaiting();
});

self.addEventListener("activate", e => {
	self.clients.claim();
});

self.addEventListener("fetch", e => {
	e.respondWith(sf(e));
});

async function sf(e) {
	const res = await caches.match(e.request.url);
	if(res) return res;
	const cache = await caches.open("cache-v1")
	const response = await fetch(e.request.url);
	const clone = await response.clone();
	cache.put(e.request, clone);
	return response;
}