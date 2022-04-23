import { asyncInsertTodoList } from "./insertTodoList.js";

export const deleteTodo = function (e) {
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
