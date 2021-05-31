var ipcRenderer = require("electron").ipcRenderer;
var closeButton = document.getElementById("close");
var minButton = document.getElementById("min");
closeButton.addEventListener("click", function (_e) {
    ipcRenderer.send("close");
});
minButton.addEventListener("click", function (_e) {
    ipcRenderer.send("min");
});
