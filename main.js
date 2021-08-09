const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    icon: "./icon.ico",
    title: "Bala Notes",
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.maximize();
  Menu.setApplicationMenu(new Menu());
  win.loadFile("src/index.html");

  ipcMain.on("close", function (event) {
    win.close();
  });

  ipcMain.on("min", function (event) {
    win.minimize();
  });

  ipcMain.on("alert", function (event, alert) {
    dialog.showMessageBox(win, {
      message: alert,
      type: "info",
      title: "  Bala Notes",
    });
  });

  ipcMain.on("confirm", async function (event, confirm) {
    let response = await dialog.showMessageBox(win, {
      message: confirm,
      type: "question",
      title: "  Bala Notes",
      buttons: ["Yes", "No"],
    });

    event.reply("confirm-reply", response["response"]);
  });
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
