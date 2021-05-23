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
    ipc.on("close", function (event) {
        win.close();
    });
    ipc.on("min", function (event) {
        win.minimize();
    });
    ipc.on("alert", function (event, alert) {
        electron_1.dialog.showMessageBox(win, {
            message: alert,
            type: "info",
            title: "  Bala Notes",
            icon: electron_1.nativeImage.createFromPath("./icon.ico")
        });
    });
    ipc.on("confirm", async function (event, confirm) {
        var response = await electron_1.dialog.showMessageBox(win, {
            message: confirm,
            type: "question",
            title: "  Bala Notes",
            icon: electron_1.nativeImage.createFromPath("./icon.ico"),
            buttons: ["Yes", "No"]
        });
        event.reply("confirm-reply", response["response"]);
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
