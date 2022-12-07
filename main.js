import { Event, save, log } from "./hlpr.js";
import { fileGen } from "./file.js";

const reader = new FileReader();
const input = document.querySelector(".file-in");
const info = document.querySelector(".info");
const sizeIn = document.querySelector("input[name=size]");
const butt = document.querySelector(".file-dl");

var name = "";

function readFile() {
	const [file] = input.files;
	if (file) {
		const { name, size, type } = file;
		info.innerHTML = `name : ${name}<br/ >size : ${(size / 1024).toFixed(
			1
		)} kb<br/ >type : ${type}<br/ >`;
		log.c();
		save({ name, file });
	}
}
input.onchange = readFile;
butt.onclick = async () => {
	const size = parseFloat(sizeIn.value || 0);
	if ( ! size ) return log.w("invalid size !");
	butt.disabled = true;
	await fileGen(size);
	butt.disabled = false;
}

/*
const worker = new Worker ("./worker.js");

worker.onmessage = e => {
	const {_eval = false} = e.data || {};
	_eval && eval(_eval);
}
*/
const sw = navigator.serviceWorker.register("sw.js", {scope : "/"})

