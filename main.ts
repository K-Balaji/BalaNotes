import {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  IpcMain,
  WebPreferences,
} from "electron";

const ipc: IpcMain = ipcMain;

function createWindow(): void {
  const win: BrowserWindow = new BrowserWindow({
    icon: "./icon.ico",
    title: "Bala Notes",
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    } as WebPreferences,
  });
  win.maximize();
  Menu.setApplicationMenu(new Menu());
  win.loadFile("src/index.html");

  ipc.on("close", (): void => {
    win.close();
  });

  ipc.on("min", (): void => {
    win.minimize();
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", function (): void {
  if ((process.platform as string) !== "darwin") {
    app.quit();
  }
});

app.on("activate", function (): void {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
