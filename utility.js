require('better-logging')(console);
const fse = require('fs-extra');
const https = require('https');
const process = require("process");
const path = require('path')
const package = require("./package.json");
var platforms;
let tasks;
function updateBlocks() {
	tasks += 1;
	console.info("Updating blocks");
	url = "https://raw.githubusercontent.com/Robot-In-A-Can/eBrain-Snap/develop/RIAC%20Blocks.xml";
	console.info("Urls: ", url);
	https.get(url, (res) => {
		const p = path.join("./", "www", "RIAC", "RIAC_blocks_module.xml");
		console.info("Path: ", p)
		console.debug('statusCode:', res.statusCode);
		console.debug('headers:', res.headers);
		const filePath = fse.createWriteStream(p);
		res.on('data', (d) => {
			console.debug(d);
		});
		res.pipe(filePath);
		filePath.on('finish', () => {
			filePath.close();
			console.info("Done updating blocks.");
		})
	}).on('error', (e) => {
		console.error(e);
	});
	tasks -= 1;
}

if (typeof require !== 'undefined' && require.main === module) {
	task += 1;
	if (process.argv.filter(a => !a.startsWith("-")).slice(2).length == 0) {
		platforms = []
	} else {
		platforms = process.argv.slice(2);
	}
	if (process.argv.includes("--updateBlocks")) {
		updateBlocks();
	}
	if (process.argv.includes("--all-platforms")) {
		platforms = package.cordova.platforms;
	}
	platforms
		.filter(i => package.cordova.platforms.includes(i))
		.forEach((p) => {
			fse.copy(path.join('./', 'platform_specific', p), path.join('./', 'platforms', p))
				.then(() => console.log(`Successfully copied: ${p}`))
				.catch(err => console.error(err))
		})
	task -=1;
}


console.info("Hi!");

module.exports = function (context) {
	var platforms = context.opts.platforms;
	updateBlocks();
	console.info("Moving files for", context.opts.platforms.join(', '));
	platforms.forEach((p) => {
		try {
			fse.copySync(path.join('./', 'platform_specific', p), path.join('./', 'platforms', p))
		} catch (err) {
			console.error(err)
		}
	})
}
while (tasks > 0) {
	delay(10)
}
console.info("I'm done here! Rock on and have a nice day!");
