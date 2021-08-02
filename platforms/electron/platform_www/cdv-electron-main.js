/*
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/

const fs = require('fs');
require('better-logging')(console);
console.logLevel = 4;
const process = require("process");
// Module to control application life, browser window and tray.
const { app, BrowserWindow } = require('electron');
// Electron settings from .json file.
const cdvElectronSettings = require('./cdv-electron-settings.json');

var document;
global.sharedObject = {};
try {
    console.info("Attempting to read file.");
    if(process.argv[1].endsWith(".xml")) {
        document = fs.readFileSync(process.argv[1]).toString();
    } else {
        document = null;
    }
} catch {
    console.error("Document could not be opened.");
    document = null;
} finally {
    console.info("Passing info to render app.")
    // console.debug(typeof document);
    // console.debug(document);
    global.sharedObject.docString = document;
}


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
    // Create the browser window.
    let appIcon;
    if (fs.existsSync(`${__dirname}/img/app.png`)) {
        appIcon = `${__dirname}/img/app.png`;
    } else if (fs.existsSync(`${__dirname}/img/icon.png`)) {
        appIcon = `${__dirname}/img/icon.png`;
    } else {
        appIcon = `${__dirname}/img/logo.png`;
    }

    const browserWindowOpts = Object.assign({}, cdvElectronSettings.browserWindow, { icon: appIcon });
    mainWindow = new BrowserWindow(browserWindowOpts);

    // and load the index.html of the app.
    // TODO: possibly get this data from config.xml
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.webContents.on('did-finish-load', function () {
        mainWindow.webContents.send('window-id', mainWindow.id);
    });

    // Open the DevTools.
    if (cdvElectronSettings.browserWindow.webPreferences.devTools) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on('close', () => {
        console.info("Closing the main window.");
        console.info("Quitting the App.");
        app.quit();
    })
    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
        console.info("Window is closed.");
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
// app.on('window-all-closed', () => {
//     console.info("Attempting to close the app");
//     // On OS X it is common for applications and their menu bar
//     // to stay active until the user quits explicitly with Cmd + Q
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });
app.on("close", () => {
    console.info("Closing the app");
    mainWindow = null;
})

app.on("quit", () => {
    console.info("Quitting apps");
})
app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    console.info("Recreating window.");
    if (mainWindow === null) {
        createWindow();
    }
});

app.on("will-quit", () => {
    console.info("App should quit now.");
})

app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
    console.info("Before quit. Window should close.")
    mainWindow.removeAllListeners('close');
    mainWindow.close();
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
