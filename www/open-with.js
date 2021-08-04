const { ipcRenderer } = require('electron');
ipcRenderer.on('loadDocument', (event, arg) => {
	console.info("Document received.");
	try { loadFromString(arg); } catch (err) { console.error(err) }
})

function loadFromString(string) {
	console.info("Loading Document.");
	world.children[0].openProjectString(string);
}
function loadFromURL(url) {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		loadFromString(this.responseText)
		// document.getElementById("demo").innerHTML = this.responseText;
	}
	xhttp.open("GET", url, true);
	xhttp.send();
}