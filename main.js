const { app, BrowserWindow, Menu } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    icon: "./icon.png",
    title: "Bala Notes",
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.maximize();
  Menu.setApplicationMenu(new Menu());
  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
