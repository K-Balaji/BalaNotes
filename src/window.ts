const { ipcRenderer } = require("electron");

const closeButton: HTMLButtonElement = document.getElementById(
  "close"
) as HTMLButtonElement;
const minButton: HTMLButtonElement = document.getElementById(
  "min"
) as HTMLButtonElement;

closeButton.addEventListener("click", function (e: MouseEvent) {
  ipcRenderer.send("close");
});

minButton.addEventListener("click", function (e: MouseEvent) {
  ipcRenderer.send("min");
});
