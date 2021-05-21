const { ipcRenderer } = require("electron");

export function alertDialog(message: string): void {
  ipcRenderer.send("alert", message);
}
