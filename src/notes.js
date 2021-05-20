var addButton = document.getElementById("add");
var themeButton = document.getElementById("theme");
var search = document.getElementById("search_text");
function generateCard(element0, element1, index) {
    var card = ("<div\n      class=\"\n        my-3\n        mx-3\n        border-0\n        rounded-xl\n        bg-gradient-to-b\n        box\n        from-yellow-400\n        to-red-500\n        dark:from-blue-600\n        dark:to-pink-600\n      \"\n      style=\"width: 20rem\"\n    >\n      <div class=\"p-3 text-body\">\n        <div>\n          <h5 class=\"dark:text-blue-200 font-bold\">" + element0 + "</h5>\n          <p class=\"dark:text-blue-200\">" + element1 + "</p>\n        </div>\n      </div>\n      <div class=\"p-3\">\n        <button\n          class=\"\n            text-base\n            hover:shadow-lg\n            bg-blue-700\n            hover:bg-blue-600\n            dark:hover:bg-purple-600\n            dark:bg-purple-700\n            p-2\n            rounded-lg\n            text-gray-200\n          \"\n          onclick=\"dele(" + index + ")\"\n        >\n          Delete\n        </button>\n      </div>\n    </div>");
    return card;
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
            : ("<small id=\"emailHelp\" class=\"font-semibold pl-4\"\n          ><h6>\n            You have no notes, click on Add a Note to create your first note!!!\n          </h6></small\n        >");
}
themeButton.addEventListener("click", function (e) {
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
        var notesCard = [title.value, addText.value];
        notesArray.push(notesCard);
        localStorage.setItem("notes", JSON.stringify(notesArray));
        addText.value = "";
        title.value = "";
        update();
    }
});
document
    .getElementById("clear")
    .addEventListener("click", function (e) {
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
