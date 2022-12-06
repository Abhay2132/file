export const wait = (a = 0, cb = false) =>
	new Promise((b) => setTimeout(() => b(cb && cb()), a));

const logs = document.querySelector(".log");
export const log = {
	a(...a) {
		logs.innerHTML += a.join(" ") + "<br />";
		logs.scrollTo(0, logs.scrollHeight);
	},
	c() {
		logs.innerHTML = "";
	},
	w(...a) {
		this.c();
		this.a(...a);
	},
	e(...a) {
		logs.innerHTML += "<span style='color:red'>" + a.join(" ") +"</span><br />";
		logs.scrollTo(0, logs.scrollHeight);
	}
};

export class Event {
	#events = {};
	on(event, listener) {
		if (this.#events[event]) this.#events[event].push(listener);
		else this.#events[event] = [listener];
		return this;
	}
	emit(event) {
		if (this.#events[event])
			for (let listener of this.#events[event]) listener();
	}
}

export function save({ name, file ,cb }) {
	const a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	const url = window.URL.createObjectURL(file); //new Blob([reader.result]));
	a.href = url;
	a.download = name;
	log.a(name);
	a.click();
	window.URL.revokeObjectURL(url);
	if(typeof cb == "function") cb();
}

export function saveAs (url, name, cb) {
	const a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	a.href = url;
	a.download = name;
	log.a(name);
	a.click();
	if(typeof cb == "function") cb();
}
