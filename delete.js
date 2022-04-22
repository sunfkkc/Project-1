import { deleteBtn } from "./document.js";

export const deleteTodo = function (e) {
  const todoList = JSON.parse(localStorage.getItem("todo"));
  const deletedTodoList = todoList.filter((item) => {});
};
