(async function () {

const time = performance.now();
const e = s => postMessage({ _eval : s});
const wait = (a = 0, cb = false) =>
	new Promise((b) => setTimeout(() => b(typeof cb == "function" && cb()), a));
	
var data = new Array();
let size = 1024*1024
/*
const l = 28;
let str = 'A';
for(let i=0; i<l; i++){ 
	await wait(10, () => (str+=str));
	e(`log.w(((${i}/${l})*100).toFixed(2) + " %");`);
}*/

let chunk = new ArrayBuffer(size);
e(`log.w("100 %");`);
e(`log.a("time : " + ((performance.now() - ${time})/1000).toFixed(2) + " secs"  );`);
e(`log.a("Creating blob ...");`);
await wait(10);

data = [chunk, chunk];
const file = new Blob(data, {type : "octet/stream"} );
e(`log.a("size : " + (${file.size}/(1024*1024)).toFixed(2) +" MB");`);

e(`log.a("caching blob ...");`);
await wait(10);

caches.open("cache-v1")
.then(c => {
	return c.put("file", new Response (file, { headers : { "Content-Length" : file.size}} ) );
})
.then(() => {
	e(`log.a("File stored in cache !"); butt.disabled = false;`);
});


})();
	