document.addEventListener('world-ready', () => {
	ipcRenderer.send('world-ready');

})