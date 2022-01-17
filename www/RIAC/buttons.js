// Injected with merges

function updateBlocks(){
	try {
		loadBlocksFromUrl(
			'https://raw.githubusercontent.com/Robot-In-A-Can/eBrain-Snap/develop/RIAC%20Blocks.xml'
			);
			console.info("Updated blocks!");
	} catch {
		console.error("Error when updating blocks.")
	}
}