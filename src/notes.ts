const { alertDialog } = require("./dialog");
const { ipcRenderer } = require("electron");

const addButton: HTMLButtonElement = document.getElementById(
  "add"
) as HTMLButtonElement;
const themeSVG: SVGElement = document.getElementById(
  "theme"
) as unknown as SVGElement;
const search: HTMLTextAreaElement = document.getElementById(
  "search_text"
) as HTMLTextAreaElement;
const themeChange: HTMLDivElement = document.getElementById(
  "themeChange"
) as HTMLDivElement;

function generateCard(
  element0: string,
  element1: string,
  index: number
): string {
  let card: string = `<div
      class="
        my-3
        mx-3
        border-0
        rounded-xl
        bg-gradient-to-b
        box
        from-blue-500
        to-green-500
        dark:from-blue-600
        dark:to-pink-600
      "
      style="width: 20rem"
    >
      <div class="p-3 text-body">
        <div>
          <h5 class="dark:text-blue-200 font-bold">${element0}</h5>
          <p class="dark:text-blue-200">${element1}</p>
        </div>
      </div>
      <div class="p-3 flex justify-end">
        <button
          class="
            text-base
            hover:shadow-lg
            hover:bg-purple-600
            bg-purple-700
            p-2
            rounded-lg
            text-gray-200
          "
          onclick="dele(${index})"
        >
          Delete
        </button>
      </div>
    </div>` as string;
  return card;
}

function updateTheme(): void {
  let theme: string = JSON.parse(localStorage.getItem("notes_theme"));
  if (theme == "dark") {
    document.getElementById("html").setAttribute("class", "dark");
    themeSVG.innerHTML =
      '<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />';
  } else if (theme === null) {
    localStorage.setItem("notes_theme", JSON.stringify("light"));
    themeSVG.innerHTML =
      '<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />';
    document.getElementById("html").setAttribute("class", "");
  } else if (theme == "light") {
    document.getElementById("html").setAttribute("class", "");
    themeSVG.innerHTML =
      '<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />';
  } else {
    throw Error("unrecognizedThemeValue");
  }
}

function update(): void {
  let notes: string = localStorage.getItem("notes");
  let notesArray: Array<Array<string>> = [];
  if (notes === null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }
  let str: string = "";
  notesArray.forEach(function (elements: Array<string>, index: number): void {
    str += generateCard(elements[0], elements[1], index);
  });
  document.getElementById("notes").innerHTML =
    str !== ""
      ? str
      : `<small id="emailHelp" class="font-semibold pl-4"
          ><h6>
            You have no notes, click on Add a Note to create your first note!!!
          </h6></small
        >`;
}

themeChange.addEventListener("click", function (_e: MouseEvent): void {
  if (JSON.parse(localStorage.getItem("notes_theme")) == "light") {
    localStorage.setItem("notes_theme", JSON.stringify("dark"));
  } else {
    localStorage.setItem("notes_theme", JSON.stringify("light"));
  }
  updateTheme();
});

addButton.addEventListener("click", function (_e: MouseEvent): void {
  const addText: HTMLTextAreaElement = document.getElementById(
    "text"
  ) as HTMLTextAreaElement;
  const title: HTMLTextAreaElement = document.getElementById(
    "title"
  ) as HTMLTextAreaElement;
  if (title.value === "") {
    alertDialog("Please enter a note");
  } else {
    let notes: string = localStorage.getItem("notes");
    let notesArray: Array<Array<string>> = [];
    if (notes === null) {
      notesArray = [];
    } else {
      notesArray = JSON.parse(notes);
    }
    let notesCard: Array<string> = [title.value, addText.value];
    notesArray.push(notesCard);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    addText.value = "";
    title.value = "";
    update();
  }
});

ipcRenderer.on("confirm-reply", (_event, response: number): void => {
  if (response == 0) {
    localStorage.removeItem("notes");
    update();
  }
});

document
  .getElementById("clear")
  .addEventListener("click", function (_e: MouseEvent): void {
    ipcRenderer.send("confirm", "Are you sure you want to clear all notes?");
  });

update();
updateTheme();

search.onkeyup = function (e: KeyboardEvent): void {
  let searchText: string = (
    document.getElementById("search_text") as HTMLTextAreaElement
  ).value.toLowerCase();
  let notes: string = localStorage.getItem("notes");
  let notesArray: Array<Array<string>> = [];
  if (notes === null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }
  let content: string = "";
  notesArray.forEach(function (element: Array<string>, index: number): void {
    if (
      element[0].toLowerCase().includes(searchText) ||
      element[1].toLowerCase().includes(searchText)
    ) {
      content += generateCard(element[0], element[1], index);
    }
  });
  document.getElementById("notes").innerHTML = content;
  e.preventDefault();
};

function dele(index: number): void {
  let notesArray: Array<string> = JSON.parse(
    localStorage.getItem("notes")
  ) as Array<string>;
  notesArray.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesArray));
  update();
}
