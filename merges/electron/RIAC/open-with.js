const { ipcRenderer } = require('electron');

document.addEventListener('world-ready', () => {
	ipcRenderer.send('world-ready');
});

ipcRenderer.on('loadDocument', (event, arg) => {
	console.info("Document received.");
	try { loadFromString(arg); } catch (err) { console.error(err) }
})

ipcRenderer.on("error", (event, arg) => {
	console.error(arg);
})
