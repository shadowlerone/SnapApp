function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("menubutton", onMenuKeyDown, false);
    // debug stuff
    console.log(device.cordova);
    console.log(device.model);
    console.log(device.platform);
    console.log(device.manufacturer);
    console.log(window)
    // Add similar listeners for other events
}

function onPause() {
    console.debug('Paused!')
}
function onResume() {
    console.debug('Resumed!');
}

window.addEventListener("cordovacallbackerror", function (event) {
    // event.error contains the original error object
    console.error(event.error);
});

function loadSnap(xmlstring) {
    world.children[0].openProjectString(xmlstring);
}

function loadSnapFromURL(url) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        loadSnap(this.responseText);
    }
    xhttp.open("GET", url || "https://snap.robotinacan.com/media/snap/2021/02/01/Blank.xml", true);
    xhttp.send();
}