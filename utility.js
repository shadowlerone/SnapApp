const fse = require('fs-extra');
const process = require("process");
const path = require('path')

const platforms = process.argv.slice(2);
console.log(platforms);

if (platforms === []) {

} else {
	platforms.forEach((p) => {
		console.log(path.join('./', 'platform_specific', p))
		console.log(path.join('./', 'platforms', p))
		fse.copy(path.join('./', 'platform_specific', p), path.join('./', 'platforms', p), {overwrite: true})
			.then(() => console.log(`Successfully copied: ${p}`))
			.catch(err => console.error(err))
	})
}
console.log("Hi!");