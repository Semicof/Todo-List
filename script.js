const tdlInput = document.querySelector(".tdl-input");
const tdlBtn = document.querySelector(".tdl-btn");
const tdl = document.querySelector(".tdl");
const ftd = document.querySelector(".filter-todo");
const rs=document.querySelector(".rs-btn");

document.addEventListener("DOMContentLoaded",getTodos);
tdlBtn.addEventListener("click", addTdl);
tdl.addEventListener("click", okNdel);
ftd.addEventListener("click", filterTodo);
rs.addEventListener("click",resetAll);

function resetAll(e)
{
    localStorage.clear();
    document.location.reload();
}

function addTdl(event) {
  event.preventDefault();

  const tdlDiv = document.createElement("div");
  tdlDiv.classList.add("todo");
  if (tdlInput.value != "") {
    const newTodo = document.createElement("li");
    newTodo.innerText = tdlInput.value;
    newTodo.classList.add("tdl-item");
    tdlDiv.appendChild(newTodo);

    saveLocalTodos(tdlInput.value);

    const okBtn = document.createElement("button");
    okBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    okBtn.classList.add("okBtn");
    tdlDiv.appendChild(okBtn);

    const delBtn = document.createElement("button");
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delBtn.classList.add("delBtn");
    tdlDiv.appendChild(delBtn);

    tdl.appendChild(tdlDiv);
  }

  tdlInput.value = "";
}

function okNdel(btn) {
  const item = btn.target;
  const p = item.parentElement;
  if (item.classList[0] === "delBtn") {
    p.remove();
    delLocalTodos(p);
  }

  if (item.classList[0] === "okBtn") {
    p.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = tdl.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "All":
        todo.style.display = "flex";
        break;
      case "Completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "Uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function delLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    }
    else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }


function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const tdlDiv = document.createElement("div");
    tdlDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("tdl-item");
    tdlDiv.appendChild(newTodo);

    const okBtn = document.createElement("button");
    okBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    okBtn.classList.add("okBtn");
    tdlDiv.appendChild(okBtn);

    const delBtn = document.createElement("button");
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delBtn.classList.add("delBtn");
    tdlDiv.appendChild(delBtn);

    tdl.appendChild(tdlDiv);
  });
}
