var ipcRenderer = require("electron").ipcRenderer;
var closeButton = document.getElementById("close");
var minButton = document.getElementById("min");
closeButton.addEventListener("click", function (e) {
    ipcRenderer.send("close");
});
minButton.addEventListener("click", function (e) {
    ipcRenderer.send("min");
});
