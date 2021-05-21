import {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  IpcMain,
  WebPreferences,
  dialog,
  IpcMainEvent,
  nativeImage,
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

  ipc.on("close", (event: IpcMainEvent): void => {
    win.close();
  });

  ipc.on("min", (event: IpcMainEvent): void => {
    win.minimize();
  });

  ipc.on("alert", (event: IpcMainEvent, alert: string) => {
    dialog.showMessageBox(win, {
      message: alert,
      type: "info",
      title: "  Bala Notes",
      icon: nativeImage.createFromPath("./icon.ico"),
    });
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
