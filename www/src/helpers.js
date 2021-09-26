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

function loadBlocks(string) {
	world.children[0].rawOpenBlocksString(string, undefined, true);
}
function loadBlocksFromUrl(url) {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		loadBlocks(this.responseText)
		// document.getElementById("demo").innerHTML = this.responseText;
	}
	xhttp.open("GET", url, true);
	xhttp.send();
}
function init_blocks (){
	loadBlocksFromUrl('./RIAC/RIAC_blocks_module.xml');
}

document.addEventListener('world-ready', () => {
	init_blocks();
});