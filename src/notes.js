const addButton = document.getElementById("add");
const search = document.getElementById("search_text");

function update() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }
  let str = "";
  notesArray.forEach(function (element, index) {
    str += `<div class="noteBox my-3 mx-3 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element[0]}</h5>
          <p class="card-text">
            ${element[1]}
          </p>
          <button class="btn btn-danger" onclick="dele(${index})">Delete</button>
        </div>
      </div>`;
  });
  document.getElementById("notes").innerHTML = str;
  if (str == "") {
    document.getElementById("notes").innerHTML =
      '<small id="emailHelp" class="form-text text-muted" style=""><h6>You have no notes, click on Add a Note to create your first note!!!</h6></small>';
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
      content += `<div class="noteBox my-3 mx-3 card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${element[0]}</h5>
              <p class="card-text">
                ${element[1]}
              </p>
              <button class="btn btn-danger" onclick="dele(${index})">Delete</button>
            </div>
          </div>`;
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
