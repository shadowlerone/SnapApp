function openMenu() {
	document.getElementById("menu-container").classList.add("show");
	console.info("Menu Opened");
}

function closeMenu() {
	document.getElementById("menu-container").classList.remove("show");
	console.info("Menu Closed");
}

function testButton() {
	console.debug("button pressed");
}