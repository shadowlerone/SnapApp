/**
* Implements functionality needed for the AI guide that loads Snap! projects into iframes
* Authors: Ken Kahn
* License: New BSD
*/

var evebrain;
var openclose = 0;

//Autoconnect! Can be annoying!
if (localStorage.getItem("IP") != null) {
	window.location = '#m=' + localStorage.getItem("IP");
} else {
	window.location = '#m=' + '192.168.4.1';
}

var app = new EveBrainApp(function (m) {
	evebrain = m;
	m.version(function (status, msg) {
		if (Number(msg.msg) < 20150201 && !localStorage['_warning_done_']) {
			localStorage['_warning_done_'] = true;
			alert("You'll need to update your eBrain firmware to use the addon blocks (bump and line following) in this app, but the other blocks should still work fine.");
		}
	});
});

let world;

window.addEventListener('load', function () {
	var world_canvas = document.getElementById('world');
	var ide_morph = new IDE_Morph();
	var loop = function loop() {
		requestAnimationFrame(loop);
		world.doOneCycle();
	};
	let full_screen = true;
	let run_full_screen = new URL(location.href).searchParams.get('noRun') !== "";
	let edit_mode = new URL(location.href).searchParams.get('editMode') !== "";
	let project_path;
	let show_palette = true; // unless in an iframe where the default is to hide it for space reasons

	IDE_Morph.prototype.reactToWorldResize = function (rect) {
		if (this.isAutoFill) {
			rect.origin.y = document.getElementById('header').getBoundingClientRect().height;
			this.setPosition(rect.origin);
			this.setExtent(rect.extent());
		}
		if (this.filePicker) {
			document.body.removeChild(this.filePicker);
			this.filePicker = null;
		}
	};

	const load_project_string =
		function (project_text) {
			// timeout wasn't needed before Snap 4.1
			// without it iframes show only Snap! background texture
			if (!project_text || project_text.indexOf('Status 404 – Not Found') >= 0) {
				ide_morph.showMessage("Error fetching " + project_path);
				return;
			}
			if (ecraft2learn) {
				ecraft2learn.stop_all_scripts();
			}
			setTimeout(function () {
				const parameters = new URLSearchParams(window.parent.location.hash);
				if (parameters.get('locale')) {
					// Snap uses _ instead of - in two part language code names
					ide_morph.setLanguage(parameters.get('locale').replace('-', '_'));
				}
				ide_morph.rawOpenProjectString(project_text);
				if (full_screen) {
					ide_morph.toggleAppMode(true);
				}
				if (run_full_screen) {
					ide_morph.runScripts();
				}
				if (edit_mode) {
					ide_morph.toggleAppMode(false);
				}
				ide_morph.showMessage(""); // remove message
				if (!show_palette && full_screen && edit_mode) {
					ide_morph.setPaletteWidth(0);
				}
			},
				1000);
		};

	const fetch_and_load = function (project_path) {
		ide_morph.showMessage("Loading...", 10);
		fetch(project_path).then(function (response) {
			ide_morph.showMessage("Opening project");
			response.text().then(load_project_string);
		}).catch(function (error) {
			ide_morph.showMessage("Error fetching " + project_path + ": " + error.message);
		});
	};


	world = new WorldMorph(world_canvas);
	//  world.worldCanvas.focus(); // not good for pages with iframes containing Snap! programs
	ide_morph.openIn(world);

	app.initPersistence({
		saveHandler: function (name) {
			ide_morph.setProjectName(name);
			return ide_morph.serializer.serialize(ide_morph.stage);
		},
		loadHandler: function (prog) {
			return ide_morph.rawOpenProjectString(prog);
		},
		clearHandler: function () {
			return ide_morph.newProject();
		}
	});


	if (window !== window.parent) { // if running in an iframe see if a local project_path is declared
		if (!window.frameElement) {
			if (window.location.protocol !== 'https:' && window.location.protocol !== 'http:') {
				alert("Cannot load project into Snap! since URL protocol is neither HTTPS nor HTTP.");
			} else {
				alert("Sorry something has gone wrong with loading projects into Snap! on this page.");
			}
			return;
		}
		project_path = window.frameElement.getAttribute("project_path");
		run_full_screen = window.frameElement.getAttribute("run_full_screen");
		full_screen = run_full_screen || window.frameElement.getAttribute("full_screen");
		edit_mode = window.frameElement.getAttribute("edit_mode");
		show_palette = window.frameElement.getAttribute("show_palette");
		is_turbo = window.frameElement.getAttribute("is_turbo");
		block_size = window.frameElement.getAttribute("block_size");
		let stage_scale = window.frameElement.getAttribute("stage_ratio");

		if (project_path) {
			fetch_and_load(project_path);
		}

		if (!full_screen && edit_mode) {
			//ide_morph.controlBar.hide();    // no need for the control bar
			ide_morph.toggleAppMode(false); // launch in edit mode
		}

		if (stage_scale) {
			ide_morph.toggleStageSize(true, +stage_scale);
		}

		if (show_palette == 'False') {
			ide_morph.setPaletteWidth(0); // If you want to hide the Palette
		}

		/*if (is_turbo == 'True') {
			ide_morph.stage.isFastTracked = true;
		}*/

		if (block_size >= 1) {
			ide_morph.setBlocksScale(parseInt(block_size));
		} else {
			ide_morph.setBlocksScale(1.6); // the chapter projects were designed with default block size (though scaled via CSS)
		}


		window.onbeforeunload = function () { }; // don't bother the user about reloading
		window.speechSynthesis.getVoices();     // no need to wait for them to load
	} else if (window.location.search) {
		const parameters = new URLSearchParams(window.location.search);
		if (parameters.has('project')) {
			let project_name = parameters.get('project');
			project_path = project_name;
			if (project_name.indexOf('/') < 0) {
				// if just a name use the default folder and extension
				project_path = "/ai/projects/" + project_path + ".xml";
			}
			edit_mode = parameters.has('editMode');
			fetch_and_load(project_path);
		}
	}
	console.info("World is ready for loading a document.");
	ipcRenderer.send('world-ready');
	// if (world.modified == 0 || world.modified == undefined) {
	// 	SpriteMorph.prototype.categories.push("RIAC");
	// 	SpriteMorph.prototype.blockColor.RIAC = new Color(216, 45, 45);
	// 	world.children[0].createCategories();
	// 	world.modified = 1;
	// }
	init_blocks();
	window.dispatchEvent(new Event('resize'));
	loop();
	window.addEventListener('load', loop);
});

