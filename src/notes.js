const addButton = document.getElementById("add");
const search = document.getElementById("search_text");

function generateCard(element0, element1, index) {
  const str = element1 !== "" ? "pb-9" : "pb-16";
  return `<div class="my-3 mx-3 border-0 rounded-xl bg-gradient-to-br from-blue-500 to-pink-500 box" style="width: 20.5rem">
        <div class="p-3 text-body">
          <div class="${str}">
            <h5 class="text-white font-bold">${element0}</h5>
            <p class="text-white">
             ${element1}
            </p>
          </div>
        </div>
        <div class="p-3"><button class="text-base hover:shadow-lg hover:bg-purple-700 bg-purple-800 p-2 rounded-lg text-white" onclick="dele(${index})">Delete</button></div>
      </div>`;
}

function update() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }
  let str = "";
  notesArray.forEach(function (element, index) {
    str += generateCard(element[0], element[1], index);
  });
  document.getElementById("notes").innerHTML = str;
  if (str == "") {
    document.getElementById("notes").innerHTML =
      '<small id="emailHelp" class="font-semibold pl-4"><h6>You have no notes, click on Add a Note to create your first note!!!</h6></small>';
  }
}

addButton.addEventListener("click", function (e) {
  let addText = document.getElementById("text");
  let title = document.getElementById("title");
  if (title.value == "") {
    alert("Please enter a note");
  } else {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
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

document.getElementById("clear").addEventListener("click", function () {
  let shouldClear = confirm("Are you sure you want to clear notes?");
  if (shouldClear) {
    localStorage.removeItem("notes");
    document.getElementById("notes").innerHTML = "";
    update();
  }
});

update();

search.onkeyup = (e) => {
  let searchText = document.getElementById("search_text").value.toLowerCase();
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }
  let content = "";
  notesArray.forEach(function (element, index) {
    if (
      element[0].toLowerCase().includes(searchText.toLowerCase()) ||
      element[1].toLowerCase().includes(searchText.toLowerCase())
    ) {
      content += generateCard(element[0], element[1], index);
    }
  });
  document.getElementById("notes").innerHTML = content;
  e.preventDefault();
};

function dele(index) {
  notesArray = JSON.parse(localStorage.getItem("notes"));
  notesArray.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesArray));
  update();
}
