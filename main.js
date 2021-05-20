"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var ipc = electron_1.ipcMain;
function createWindow() {
    var win = new electron_1.BrowserWindow({
        icon: "./icon.ico",
        title: "Bala Notes",
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.maximize();
    electron_1.Menu.setApplicationMenu(new electron_1.Menu());
    win.loadFile("src/index.html");
    ipc.on("close", function () {
        win.close();
    });
    ipc.on("min", function () {
        win.minimize();
    });
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
