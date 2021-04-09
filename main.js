"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
function createWindow() {
    var win = new electron_1.BrowserWindow({
        icon: "./icon.ico",
        title: "Bala Notes",
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.maximize();
    electron_1.Menu.setApplicationMenu(new electron_1.Menu());
    win.loadFile("src/index.html");
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
