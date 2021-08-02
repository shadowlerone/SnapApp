require('better-logging')(console);
const fse = require('fs-extra');
const process = require("process");
const path = require('path')
const package = require("./package.json");
var platforms;


if (process.argv.slice(2).length == 0) {
	platforms = package.cordova.platforms;
} else {
	platforms = process.argv.slice(2);
}

platforms.forEach((p) => {
	fse.copy(path.join('./', 'platform_specific', p), path.join('./', 'platforms', p))
		.then(() => console.log(`Successfully copied: ${p}`))
		.catch(err => console.error(err))
})

console.log("Hi!");

module.exports = function (context) {
	console.log(context)
	var platforms = context.opts.platforms;
	platforms.forEach((p) => {
		try {
			fse.copySync(path.join('./', 'platform_specific', p), path.join('./', 'platforms', p))
		} catch (err){
			console.error(err)
		}
	})
}