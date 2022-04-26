import * as doc from "./document.js";
import { makeDeleteIcon, makeCheckBox, makeChangeIcon } from "./getIcons.js";
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
    chkBox.onclick = onClickChkBox;
    const deleteIcon = makeDeleteIcon(item);
    deleteIcon.onclick = deleteTodo;
    const changeIcon = makeChangeIcon(item);
    changeIcon.onclick = getInputBox1;

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

//onClick checkBox
function onClickChkBox(e) {
  todos.map((item) => {
    if (item.id === parseInt(e.target.id)) {
      item.done = !item.done;
    }
  });
  saveTodos();
}

//change todo
function getInputBox1(e) {
  const targetId = parseInt(e.target.id);
  const isChanging = document.querySelector(".changeTitle");
  if (isChanging && targetId !== parseInt(isChanging.id)) {
    return alert("수정을 완료해 주세요!"); //수정중 다른 changeIcon을 눌렀을 때
  }
  if (isChanging) {
    return confirmChange1(); //수정중 현재 changeIcon을 눌렀을 때
  }
  /**
   * 수정 아이콘을 눌렀을 때 input박스로 변환이 되고
   * input박스 안에 원래 value가 담김
   */
  const todoTitle = document.querySelector(`#title${targetId}`);
  const changeTitleBox = document.createElement("input");
  changeTitleBox.setAttribute("type", "text");
  changeTitleBox.setAttribute("class", "changeTitle");
  changeTitleBox.setAttribute("id", `${targetId}changeTitleBox`);
  changeTitleBox.value = todos[targetId].title;
  changeTitleBox.addEventListener("keyup", inputEnterKey);
  todoTitle.innerHTML = "";
  todoTitle.appendChild(changeTitleBox);
  todoTitle.appendChild(
    document.createTextNode(" - " + todos[targetId].location)
  );
  changeTitleBox.focus();
}

function inputEnterKey(e) {
  if (e.keyCode === 13) {
    //enter 키를 눌렀을 때
    confirmChange1();
  }
}

function confirmChange1(e) {
  const changeTitleBox = document.querySelector(".changeTitle");
  todos[parseInt(changeTitleBox.id)].title = changeTitleBox.value;
  saveTodos();
}
