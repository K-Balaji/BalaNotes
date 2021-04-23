const addButton: HTMLElement = document.getElementById("add");
const themeButton: HTMLElement = document.getElementById("theme");
const search: HTMLTextAreaElement = document.getElementById(
  "search_text"
) as HTMLTextAreaElement;

function generateCard(
  element0: string,
  element1: string,
  index: number
): string {
  return `<div class="my-3 mx-3 border-0 rounded-xl bg-gradient-to-br box from-yellow-400 to-red-500 dark:from-blue-600 dark:to-pink-600" style="width: 20.5rem">
        <div class="p-3 text-body">
          <div>
            <h5 class="dark:text-blue-200 font-bold">${element0}</h5>
            <p class="dark:text-blue-200">
             ${element1}
            </p>
          </div>
        </div>
        <div class="p-3"><button class="text-base hover:shadow-lg bg-blue-700  hover:bg-blue-500 dark:hover:bg-purple-600 dark:bg-purple-700 p-2 rounded-lg dark:text-gray-200" onclick="dele(${index})">Delete</button></div>
      </div>` as string;
}

function updateTheme(): void {
  let theme: string = JSON.parse(localStorage.getItem("notes_theme"));
  if (theme == "dark") {
    document.getElementById("html").setAttribute("class", "dark");
  } else if (theme === null) {
    localStorage.setItem("notes_theme", JSON.stringify("light"));
    document.getElementById("html").setAttribute("class", "");
  } else if (theme == "light") {
    document.getElementById("html").setAttribute("class", "");
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
  notesArray.forEach(function (element: Array<string>, index: number) {
    str += generateCard(element[0], element[1], index);
  });
  document.getElementById("notes").innerHTML =
    str !== ""
      ? str
      : '<small id="emailHelp" class="font-semibold pl-4"><h6>You have no notes, click on Add a Note to create your first note!!!</h6></small>';
}

themeButton.addEventListener("click", (e: MouseEvent): void => {
  if (JSON.parse(localStorage.getItem("notes_theme")) == "light") {
    localStorage.setItem("notes_theme", JSON.stringify("dark"));
  } else {
    localStorage.setItem("notes_theme", JSON.stringify("light"));
  }
  updateTheme();
});

addButton.addEventListener("click", function (e: MouseEvent): void {
  let addText: HTMLTextAreaElement = document.getElementById(
    "text"
  ) as HTMLTextAreaElement;
  let title: HTMLTextAreaElement = document.getElementById(
    "title"
  ) as HTMLTextAreaElement;
  if (title.value === "") {
    alert("Please enter a note");
  } else {
    let notes: string = localStorage.getItem("notes");
    let notesArray: Array<Array<string>> = [];
    if (notes === null) {
      notesArray = [];
    } else {
      notesArray = JSON.parse(notes);
    }
    notesArray.push([title.value, addText.value]);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    addText.value = "";
    title.value = "";
    update();
  }
});

document
  .getElementById("clear")
  .addEventListener("click", function (e: MouseEvent): void {
    let shouldClear: boolean = confirm("Are you sure you want to clear notes?");
    if (shouldClear) {
      localStorage.removeItem("notes");
      document.getElementById("notes").innerHTML = "";
      update();
    }
  });

update();
updateTheme();

search.onkeyup = (e: KeyboardEvent): void => {
  let searchText: string = (document.getElementById(
    "search_text"
  ) as HTMLTextAreaElement).value.toLowerCase();
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
  let notesArray: Array<string> = [];
  notesArray = JSON.parse(localStorage.getItem("notes"));
  notesArray.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesArray));
  update();
}
