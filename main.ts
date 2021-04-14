import { app, BrowserWindow, Menu } from "electron";

function createWindow(): void {
  const win: BrowserWindow = new BrowserWindow({
    icon: "./icon.ico",
    title: "Bala Notes",
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.maximize();
  win.setResizable(false);
  Menu.setApplicationMenu(new Menu());
  win.loadFile("src/index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", (): void => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", (): void => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
