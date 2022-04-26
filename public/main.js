import { Database } from "./database.js";
import * as doc from "./document.js";
import { InsertTodoList } from "./insertTodoList.js";
import { getReverseGeocoding } from "./util.js";

let todos = [];
function main() {
  todos = Database.load();
  InsertTodoList(todos);
}

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
  Database.save(todos);
  endLoading();
};
doc.newBtn.addEventListener("click", addTodo);
main();
