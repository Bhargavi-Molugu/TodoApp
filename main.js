let submitBtn = document.getElementById("new-task-submit");

function onToDoSubmit(event) {
  event.preventDefault();

  let formInput = document.getElementById("new-task-input");
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let obj = {
    todo: formInput.value,
    selected: false,
  };
  todos.push(obj);

  addTask(obj);
  localStorage.setItem("todos", JSON.stringify(todos));

  formInput.value = "";
}
function addTask(taskObj) {
  let contentList = document.querySelector(".content-list");
  let actionsList = document.createElement("li");
  let inputCheckbox = document.createElement("input");
  let taskInput = document.createElement("h2");
  let deleteBtn = document.createElement("i");

  actionsList.classList.add("actions-list");
  inputCheckbox.classList.add("checkbox");
  taskInput.classList.add("text");
  deleteBtn.className = "fas fa-trash";

  inputCheckbox.type = "checkbox";
  inputCheckbox.checked = taskObj.selected;
  taskInput.innerText = taskObj.todo;

  if (taskObj.selected) {
    taskInput.style.textDecoration = "line-through";
  }

  actionsList.append(inputCheckbox);
  actionsList.append(taskInput);
  actionsList.append(deleteBtn);
  contentList.append(actionsList);

  inputCheckbox.addEventListener("click", onDoneBtn);
  deleteBtn.addEventListener("click", onDeleteBtn);
}

submitBtn.addEventListener("click", onToDoSubmit);

function onDoneBtn(event) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let taskList = event.target.parentElement;
  let task = taskList.children[1].innerText;
  let index = -1;
  for (var i = 0; i < todos.length; i++) {
    console.log(todos[i]);
    if (todos[i].todo === task) {
      index = i;
    }
  }
  todos[index].selected = event.target.checked;
  localStorage.setItem("todos", JSON.stringify(todos));
  if (event.target.checked) {
    taskList.children[1].style.textDecoration = "line-through";
  } else {
    taskList.children[1].style.textDecoration = "none";
  }

  taskList.firstElementChild.style.textColor = "red";
}

function onDeleteBtn(event) {
  let taskList = event.target.parentElement;
  console.log(taskList);
  let todos = JSON.parse(localStorage.getItem("todos"));
  let index = -1;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].todo == taskList.children[1].innerText) {
      index = i;
    }
  }
 
  todos.splice(index, 1);
  console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
  taskList.remove();
}

let todos = JSON.parse(localStorage.getItem("todos")) || [];
todos.forEach(addTask);