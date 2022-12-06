self.addEventListener("install", e => {
	self.skipWaiting();
});

self.addEventListener("activate", e => {
	self.clients.claim();
});

self.addEventListener("fetch", e => {
	//console.log("fetching ", e.request?.url);
	const {url = false} = e.request || {};
	if(!url) return false;
	const u = new URL(url);
	if(u.pathname != "/file") return false;
	e.respondWith(caches.match("/file"))
});