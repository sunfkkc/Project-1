import { asyncInsertTodoList } from "./insertTodoList.js";

export const makeDeleteIcon = function (item) {
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-solid fa-trash");
  deleteIcon.onclick = deleteTodo;
  deleteIcon.id = `${item.id}deleteIcon`;
  return deleteIcon;
};
const deleteTodo = function (e) {
  const beforeDeletTodoList = JSON.parse(localStorage.getItem("todo"));
  const deletedTodoList = beforeDeletTodoList.filter(
    (item) => item.id !== parseInt(e.target.id)
  );
  for (let i = parseInt(e.target.id); i < deletedTodoList.length; i++) {
    deletedTodoList[i].id = i;
  }
  localStorage.clear();
  localStorage.setItem("todo", JSON.stringify(deletedTodoList));
  asyncInsertTodoList(deletedTodoList);
};
