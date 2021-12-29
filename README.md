# SnapApp

This repository contains the code to turn [Robot in a Can Snap!](https://github.com/Robot-In-A-Can/eBrain-Snap/) into an app for various platforms.

## RIAC Specific code in SnapApp

All RIAC specific code is found in `www/RIAC/`. `./helpers.js` deals with loading Snap projects and blocks. 

Changes to Snap!: Commented out `window.onbeforeunload` from `src/morphic.js` because it stops the app from closing.

## Structure

The base Snap repo goes in `www/`. A few edits are made to support the various platforms. 


### merges

This folder is for injecting platform specific code into the `www` folder.
For more details, see [Cordova Documentation](https://cordova.apache.org/docs/en/10.x/guide/cli/#using-merges-to-customize-each-platform)

### platform_specific

`platform_specific` is for code to be injected into the cordova `platforms` folders. Think of it like a `merges` for that folder. The injection isn't handled by Cordova though: it's handled by `utility.js`.

### `utility.js`

`utility.js` is a helper script that is run before each build of the app. On build, it copies all the files in `platform_specific` to their respective folders (`merges` is handled directly by Cordova). It then downloads the latest [RIAC Snap Blocks](https://raw.githubusercontent.com/Robot-In-A-Can/eBrain-Snap/develop/RIAC%20Blocks.xml) and copies it to the `www` folder. Once the script is done running, Cordova builds the app.

# Electron

The Electron build of the app is functional and is ready for use.
## Electron platform_specific

`platform_specific/electron/platform_www/cdv-electron-main.js`: contains code to open `xml` snap projects. If a document can be read, it is sent to the Snap application, where it is processed in [`merges/electron/RIAC/open-with.js/`](#electron-merges).

## Electron Merges

`merges/electron/RIAC/open-with.js`: This file handles communication with the electron main process. It listens for a `world-ready` event from the document and passes it on to main process. If the main process has a file to send, it send it along with a `loadDocument` event, and the file is loaded into Snap app.
