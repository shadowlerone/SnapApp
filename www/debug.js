const windowEvents = [
	'error',
	'languagechange',
	// 'orientationchange',
	// 'devicemotion',
	// 'deviceorientation',
	'resize',
	'storage',
	'animationcancel',
	'animationend',
	'animationiteration',
	'animationstart',
	'copy',
	'cut',
	'paste',
	'offline',
	'online',
	// 'blur',
	// 'focus',
	'gamepadconnected',
	'gamepaddisconnected',
	// 'beforeunload',
	'DOMContentLoaded',
	'load',
	// 'unload',
	'message',
	'messageerror',
	'rejectionhandled',
	'unhandledrejection'
]

function logging(e) {
	console.info(e);
	console.trace();
}

windowEvents.forEach((e) => {
	window.addEventListener(e, logging, {passive: true});
	console.info(window[e])
})