import { save, wait , log , saveAs } from "./hlpr.js";
const maxSize = 1024;
const mb = 1024 * 1024;
export async function fileGen(size) {
	log.c();
	let c_arr = new Array(); // chunk size array 
	if(size > maxSize) {
		for(let i=0; i < parseInt(size / maxSize); i++)
			c_arr[i] = maxSize;
		c_arr[c_arr.length] = size % maxSize;
	} else c_arr[0] = size;
	
	log.a("Creating arraybuffer :", c_arr.length);
	await wait(10);
	let err = false;
	try {
	var data = c_arr.map(s => new ArrayBuffer(mb*s)) //[chunk, chunk];
	} catch(e){
		log.e(e.stack);
		err = true;
	}
	if(err) return;
	log.a("Generating Blob ...");
	await wait(10);
	const file = new Blob(data, {type : "octet/stream"} );
	
	save({file, name : "Abhay"});
}
