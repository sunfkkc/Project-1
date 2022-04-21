import { UpdateTodoList } from "./main.js";
const FindTodo = document.getElementById("find-input");
const FindBtn = document.querySelector(".modal--find__btn--submit");
const HeaderFindBtn = document.querySelector(".content-header--find");
const todoList = document.getElementById("new_todoList");
const ContentFind = document.querySelector(".content-body--modal--find");
const ContentNew = document.querySelector(".content-body--modal--new");
FindBtn.addEventListener("click", FindSubmit);
HeaderFindBtn.addEventListener("click", (e) => {
  ContentFind.classList.add("show");
  ContentNew.classList.remove("show");
  todoList.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    UpdateTodoList(i);
  }
});
function FindSubmit(e) {
  todoList.innerHTML = "";
  if (!FindTodo.value) {
    for (let i = 0; i < localStorage.length; i++) {
      UpdateTodoList(i);
    }
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      if (
        JSON.parse(localStorage.getItem(i)).Todo.search(FindTodo.value) !== -1
        /* search : 찾는 문장이 포함되어 있지 않으면 -1 리턴*/
      ) {
        UpdateTodoList(i);
      }
    }
  }
}
