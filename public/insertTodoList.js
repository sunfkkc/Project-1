import * as doc from "./document.js";
import { makeDeleteIcon } from "./delete.js";
import { makeCheckBox } from "./check.js";
import { makeChangeIcon } from "./change.js";
import { Database } from "./database.js";
import { getReverseGeocoding } from "./util.js";
let todos = [];
export function loadTodos() {
  todos = Database.load();
}
function saveTodos() {
  Database.save(todos);
  makeTodoList();
}
export const makeTodoList = async function () {
  doc.$todoList.innerHTML = "";

  for (const item of todos) {
    const todo = document.createElement("li");

    const todoTitle = document.createElement("span");
    todoTitle.innerText = item.title + " - " + item.location;
    todoTitle.setAttribute("id", `title${item.id}`);
    todo.appendChild(todoTitle);

    const chkBox = makeCheckBox(item);
    const deleteIcon = makeDeleteIcon(item);
    deleteIcon.onclick = deleteTodo;
    const changeIcon = makeChangeIcon(item);

    todo.setAttribute("key", item.id);
    todo.appendChild(chkBox);
    todo.appendChild(changeIcon);
    todo.appendChild(deleteIcon);

    doc.$todoList.appendChild(todo);
  }
};

//add todo
function isLoading() {
  doc.newBtn.classList.add("hidden");
  doc.newTodo.readOnly = true;
  doc.$contentNew.appendChild(doc.loadingLabel);
}
function endLoading() {
  doc.$contentNew.removeChild(doc.loadingLabel);
  doc.newBtn.classList.remove("hidden");
  doc.newTodo.readOnly = false;
  doc.newTodo.value = "";
}
const addTodo = async function () {
  const newContent = doc.newTodo.value;
  if (!newContent || !doc.newTodo) {
    return alert("할 일을 입력해 주세요!");
  }
  isLoading();
  const newTodo = {
    id: todos.length,
    title: doc.newTodo.value,
    location: await getReverseGeocoding(),
    done: false,
  };
  todos.push(newTodo);
  saveTodos();
  endLoading();
};
doc.newBtn.addEventListener("click", addTodo);

//delete todo
const deleteTodo = function (e) {
  const targetId = parseInt(e.target.id);
  todos = todos.filter((item) => item.id !== targetId);
  for (let i = targetId; i < todos.length; i++) {
    todos[i].id = i;
  }
  saveTodos();
};
