require('better-logging')(console);
const fse = require('fs-extra');
const process = require("process");
const path = require('path')
const package = require("./package.json");
var platforms;

if (typeof require !== 'undefined' && require.main === module) {
	if (process.argv.slice(2).length == 0) {
		platforms = package.cordova.platforms;
	} else {
		platforms = process.argv.slice(2);
	}

	platforms
		.filter(i => package.cordova.platforms.includes(i))
		.forEach((p) => {
			fse.copy(path.join('./', 'platform_specific', p), path.join('./', 'platforms', p))
				.then(() => console.log(`Successfully copied: ${p}`))
				.catch(err => console.error(err))
		})
}


console.info("Hi!");

module.exports = function (context) {
	var platforms = context.opts.platforms;
	console.info("Moving files for", context.opts.platforms.join(', '));
	platforms.forEach((p) => {
		try {
			fse.copySync(path.join('./', 'platform_specific', p), path.join('./', 'platforms', p))
		} catch (err) {
			console.error(err)
		}
	})
}

console.info("I'm done here! Rock on and have a nice day!");
