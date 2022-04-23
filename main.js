import * as doc from "./document.js";
import { asyncInsertTodoList } from "./insertTodoList.js";

/* 새로고침 할때 투두리스트 불러오기 */
if (localStorage.length === 0) {
  localStorage.setItem("todo", JSON.stringify([]));
} else {
  asyncInsertTodoList(JSON.parse(localStorage.getItem("todo")));
}

/* get 위도 경도 */
function getPosition() {
  return new Promise((res, rej) =>
    navigator.geolocation.getCurrentPosition(res, rej)
  );
}

const addTodo = function () {
  /* 제출 후 로컬 스토리지 저장 */
  const newContent = doc.newTodo.value;
  if (!newContent || !doc.newTodo) {
    throw new Error("invalid content");
  }
  doc.newBtn.classList.add("hidden");
  doc.newTodo.readOnly = true;
  doc.$contentNew.appendChild(doc.loadingLabel);
  getPosition()
    .then((pos) => {
      const todo = {
        id: JSON.parse(localStorage.getItem("todo")).length,
        title: doc.newTodo.value,
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude,
        done: false,
      };
      const todoList = JSON.parse(localStorage.getItem("todo"));
      todoList.push(todo);
      localStorage.setItem("todo", JSON.stringify(todoList));
      doc.$contentNew.removeChild(doc.loadingLabel);
      doc.newBtn.classList.remove("hidden");
      doc.newTodo.readOnly = false;
      asyncInsertTodoList(todoList);
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
doc.newBtn.addEventListener("click", addTodo);
