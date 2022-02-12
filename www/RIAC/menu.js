function openMenu(id) {
	document.getElementById(id).classList.add("show");
	console.info("Menu Opened");
}

function closeMenus() {
	Array.from (document.getElementsByClassName("menu-container")).forEach (e => e.classList.remove("show"))
}

function closeMenu(id) {
	document.getElementById(id).classList.remove("show");
	console.info("Menu Closed");
}
function loadList(url) {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		
		// loadFromString(this.responseText)
		// document.getElementById("demo").innerHTML = this.responseText;
	}
	xhttp.open("GET", url, true);
	xhttp.send();
}


function testButton() {
	console.debug("button pressed");
}

// Menu toggle code

Array.from(document.getElementsByClassName("menu-toggle")).forEach(e => {
	e.addEventListener('click', (event) => {
		console.log(event.target.dataset.menuTarget + '-menu-container')
		// document.getElementById(event.target.dataset.menuTarget + '-container').classList.add("show");
		openMenu(event.target.dataset.menuTarget + '-menu-container');
	})
})

// Menu closing

Array.from(document.getElementsByClassName("menu")).forEach(e => {
	e.addEventListener('click', (event) => {
		event.target.parentElement.classList.remove("show");
		if (event.target.dataset.parentMenu) {
			openMenu(event.target.dataset.parentMenu + '-menu-container')
		}
	})
})

// Dynamic Menus, these send API calls to create their lists

Array.from(
	document.getElementsByClassName("dynamic-menu"))
	.forEach(e => {
		fetch(e.dataset.listUrl)
			.then (response => response.json())
			.then (data => data.projects
				.forEach(
					(p) => {
						b = document.createElement('div');
						b.classList.add("button");
						b.addEventListener('click', () => {
							loadFromURL(p.filepath);
							closeMenus();
						});
						b.textContent = p.name;
						e.appendChild(b);
						// console.log(e);
					}
				))
	})

