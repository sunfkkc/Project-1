import { Database } from "./database";
import { newTodo } from "./document";
export const makeCheckBox = function (item) {
  const chkBox = document.createElement("input");
  chkBox.type = "checkbox";
  chkBox.value = item.done;
  chkBox.onclick = onClickChkBox;
  chkBox.id = `${item.id}chkBox`;
  chkBox.setAttribute("class", "chkBox");
  item.done ? (chkBox.checked = true) : (chkBox.checked = false);
  return chkBox;
};
function onClickChkBox(e) {
  const todoList = Database.load();
  let newTodoList = [];
  todoList.map((item) => {
    if (item.id == parseInt(e.target.id)) {
      item.done = !item.done;
    }
    newTodoList.push(item);
  });
  localStorage.clear();
  //localStorage.setItem("todo", JSON.stringify(newTodoList));
  Database.save(newTodoList);
}
