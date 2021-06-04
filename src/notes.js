var alertDialog = require("./dialog").alertDialog;
var ipcRenderer = require("electron").ipcRenderer;
var addButton = document.getElementById("add");
var themeSVG = document.getElementById("theme");
var search = document.getElementById("search_text");
var themeChange = document.getElementById("themeChange");
function generateCard(element0, element1, index) {
    var card = "<div\n      class=\"\n        m-3\n        rounded-xl\n        bg-gradient-to-b\n        box\n        from-blue-500\n        to-green-500\n        dark:from-blue-600\n        dark:to-pink-600\n      \"\n    >\n      <div class=\"p-3 text-body\">\n        <div>\n          <h5 class=\"dark:text-blue-200 font-bold\">" + element0 + "</h5>\n          <p class=\"dark:text-blue-200\">" + element1 + "</p>\n        </div>\n      </div>\n      <div class=\"p-3 flex justify-end\">\n        <button\n          class=\"\n            text-base\n            hover:shadow-lg\n            hover:bg-purple-600\n            bg-purple-700\n            p-2\n            rounded-lg\n            text-gray-200\n          \"\n          onclick=\"dele(" + index + ")\"\n        >\n          Delete\n        </button>\n      </div>\n    </div>";
    return card;
}
function updateTheme() {
    var theme = JSON.parse(localStorage.getItem("notes_theme"));
    if (theme == "dark") {
        document.getElementById("html").setAttribute("class", "dark");
        themeSVG.innerHTML =
            '<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />';
    }
    else if (theme === null) {
        localStorage.setItem("notes_theme", JSON.stringify("light"));
        themeSVG.innerHTML =
            '<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />';
        document.getElementById("html").setAttribute("class", "");
    }
    else if (theme == "light") {
        document.getElementById("html").setAttribute("class", "");
        themeSVG.innerHTML =
            '<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />';
    }
    else {
        throw Error("unrecognizedThemeValue");
    }
}
function update() {
    var notes = localStorage.getItem("notes");
    var notesArray = [];
    if (notes === null) {
        notesArray = [];
    }
    else {
        notesArray = JSON.parse(notes);
    }
    var str = "";
    notesArray.forEach(function (elements, index) {
        str += generateCard(elements[0], elements[1], index);
    });
    document.getElementById("notes").innerHTML =
        str !== ""
            ? str
            : "<small id=\"emailHelp\" class=\"font-semibold pl-4\"\n          ><h6>\n            You have no notes, click on Add a Note to create your first note!!!\n          </h6></small\n        >";
}
themeChange.addEventListener("click", function (_e) {
    if (JSON.parse(localStorage.getItem("notes_theme")) == "light") {
        localStorage.setItem("notes_theme", JSON.stringify("dark"));
    }
    else {
        localStorage.setItem("notes_theme", JSON.stringify("light"));
    }
    updateTheme();
});
addButton.addEventListener("click", function (_e) {
    var addText = document.getElementById("text");
    var title = document.getElementById("title");
    if (title.value === "") {
        alertDialog("Please enter a note");
    }
    else {
        var notes = localStorage.getItem("notes");
        var notesArray = [];
        if (notes === null) {
            notesArray = [];
        }
        else {
            notesArray = JSON.parse(notes);
        }
        var notesCard = [title.value, addText.value];
        notesArray.push(notesCard);
        localStorage.setItem("notes", JSON.stringify(notesArray));
        addText.value = "";
        title.value = "";
        update();
    }
});
ipcRenderer.on("confirm-reply", function (_event, response) {
    if (response == 0) {
        localStorage.removeItem("notes");
        update();
    }
});
document
    .getElementById("clear")
    .addEventListener("click", function (_e) {
    ipcRenderer.send("confirm", "Are you sure you want to clear all notes?");
});
update();
updateTheme();
search.onkeyup = function (e) {
    var searchText = document.getElementById("search_text").value.toLowerCase();
    var notes = localStorage.getItem("notes");
    var notesArray = [];
    if (notes === null) {
        notesArray = [];
    }
    else {
        notesArray = JSON.parse(notes);
    }
    var content = "";
    notesArray.forEach(function (element, index) {
        if (element[0].toLowerCase().includes(searchText) ||
            element[1].toLowerCase().includes(searchText)) {
            content += generateCard(element[0], element[1], index);
        }
    });
    document.getElementById("notes").innerHTML = content;
    e.preventDefault();
};
function dele(index) {
    var notesArray = JSON.parse(localStorage.getItem("notes"));
    notesArray.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    update();
}
