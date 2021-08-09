const { ipcRenderer } = require('electron');

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Now safe to use device APIs
	console.info("Device ready.");
}



ipcRenderer.on('loadDocument', (event, arg) => {
	console.info("Document received.");
	try { loadFromString(arg); } catch (err) { console.error(err) }
})

function init_blocks (){
	var po = document.createElement("script");
	po.type = "text/javascript";
	po.async = true;
	po.src = "./evebrain.js";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(po, s);
	if (world.modified == 0 || world.modified == undefined) {
			SpriteMorph.prototype.categories.push("RIAC");
			SpriteMorph.prototype.blockColor.RIAC = new Color(216, 45, 45);
			world.children[0].createCategories();
			world.modified = 1;
	}
}


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