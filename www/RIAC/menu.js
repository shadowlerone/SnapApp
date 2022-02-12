function openMenu(id) {
	document.getElementById(id).classList.add("show");
	console.info("Menu Opened");
}

function closeMenu(id) {
	document.getElementById(id).classList.remove("show");
	console.info("Menu Closed");
}

function testButton() {
	console.debug("button pressed");
}

// function closeMenu(this) {
// 	if (this.classList.contains('menu')) {
// 		this.parent.classList.remove("show");
// 	}
// }

Array.from(document.getElementsByClassName("menu-toggle")).forEach(e => {
	e.addEventListener('click', (event) => {
		console.log(event.target.dataset.menuTarget + '-menu-container')
		// document.getElementById(event.target.dataset.menuTarget + '-container').classList.add("show");
		openMenu(event.target.dataset.menuTarget + '-menu-container');
	})
})

Array.from(document.getElementsByClassName("menu")).forEach(e => {
	e.addEventListener('click', (event) => {
		event.target.parentElement.classList.remove("show");
		if (event.target.dataset.parentMenu) {
			openMenu(event.target.dataset.parentMenu + '-menu-container')
		}
	})
})