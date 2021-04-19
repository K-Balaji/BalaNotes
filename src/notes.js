var addButton = document.getElementById("add");
var themeButton = document.getElementById("theme");
var search = document.getElementById("search_text");
function generateCard(element0, element1, index) {
    return "<div class=\"my-3 mx-3 border-0 rounded-xl bg-gradient-to-br box from-yellow-400 to-red-500 dark:from-blue-600 dark:to-pink-600\" style=\"width: 20.5rem\">\n        <div class=\"p-3 text-body\">\n          <div>\n            <h5 class=\"dark:text-blue-200 font-bold\">" + element0 + "</h5>\n            <p class=\"dark:text-blue-200\">\n             " + element1 + "\n            </p>\n          </div>\n        </div>\n        <div class=\"p-3\"><button class=\"text-base hover:shadow-lg bg-blue-700  hover:bg-blue-500 dark:hover:bg-purple-600 dark:bg-purple-700 p-2 rounded-lg dark:text-gray-200\" onclick=\"dele(" + index + ")\">Delete</button></div>\n      </div>";
}
function updateTheme() {
    var theme = JSON.parse(localStorage.getItem("notes_theme"));
    if (theme == "dark") {
        document.getElementById("html").setAttribute("class", "dark");
    }
    else if (theme === null) {
        localStorage.setItem("notes_theme", JSON.stringify("light"));
        document.getElementById("html").setAttribute("class", "");
    }
    else if (theme == "light") {
        document.getElementById("html").setAttribute("class", "");
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
    notesArray.forEach(function (element, index) {
        str += generateCard(element[0], element[1], index);
    });
    document.getElementById("notes").innerHTML = str;
    if (str === "") {
        document.getElementById("notes").innerHTML =
            '<small id="emailHelp" class="font-semibold pl-4"><h6>You have no notes, click on Add a Note to create your first note!!!</h6></small>';
    }
}
themeButton.addEventListener("click", function () {
    if (JSON.parse(localStorage.getItem("notes_theme")) == "light") {
        localStorage.setItem("notes_theme", JSON.stringify("dark"));
    }
    else {
        localStorage.setItem("notes_theme", JSON.stringify("light"));
    }
    updateTheme();
});
addButton.addEventListener("click", function (e) {
    var addText = document.getElementById("text");
    var title = document.getElementById("title");
    if (title.value === "") {
        alert("Please enter a note");
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
        notesArray.push([title.value, addText.value]);
        localStorage.setItem("notes", JSON.stringify(notesArray));
        addText.value = "";
        title.value = "";
        update();
    }
});
document.getElementById("clear").addEventListener("click", function () {
    var shouldClear = confirm("Are you sure you want to clear notes?");
    if (shouldClear) {
        localStorage.removeItem("notes");
        document.getElementById("notes").innerHTML = "";
        update();
    }
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
        if (element[0].toLowerCase().includes(searchText.toLowerCase()) ||
            element[1].toLowerCase().includes(searchText.toLowerCase())) {
            content += generateCard(element[0], element[1], index);
        }
    });
    document.getElementById("notes").innerHTML = content;
    e.preventDefault();
};
function dele(index) {
    var notesArray = [];
    notesArray = JSON.parse(localStorage.getItem("notes"));
    notesArray.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    update();
}
