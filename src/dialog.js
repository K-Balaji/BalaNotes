"use strict";
exports.__esModule = true;
exports.alertDialog = void 0;
var ipcRenderer = require("electron").ipcRenderer;
function alertDialog(message) {
    ipcRenderer.send("alert", message);
}
exports.alertDialog = alertDialog;
