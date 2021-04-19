var _a = require("electron"), app = _a.app, BrowserWindow = _a.BrowserWindow, Menu = _a.Menu;
var win;
function createWindow() {
    win = new BrowserWindow({
        icon: "./icon.ico",
        title: "Bala Notes",
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.maximize();
    Menu.setApplicationMenu(new Menu());
    win.loadFile("src/index.html");
}
app.whenReady().then(createWindow);
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
