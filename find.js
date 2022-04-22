import * as doc from "./document.js";
import { deleteTodo } from "./delete.js";
const geocoder = new kakao.maps.services.Geocoder();

function getReverseGeocoding(longitude, latitude) {
  return new Promise((res, rej) =>
    geocoder.coord2RegionCode(longitude, latitude, (msg, status) => {
      if (status === kakao.maps.services.Status.OK) {
        res(msg[0].address_name);
      } else {
        return rej(new Error("Bad Status"));
      }
    })
  );
}

doc.headerFindBtn.addEventListener("click", searchTodo);

function searchTodo(e) {
  doc.$contentNew.classList.add("hidden");
  doc.$todoList.classList.remove("hidden");
  doc.$todoList.innerHTML = "";
  const todoList = JSON.parse(localStorage.getItem("todo"));
  todoList.forEach((item) => {
    getReverseGeocoding(item.longitude, item.latitude)
      .then((reverseGeo) => {
        const icon = document.createElement("i");
        icon.setAttribute("class", "fas fa-solid fa-trash");
        icon.onclick = deleteTodo;
        icon.id = `${item.id}deleteIcon`;
        const todo = document.createElement("li");
        const title = document.createTextNode(
          item.title + " - " + reverseGeo + " "
        );
        const chkBox = document.createElement("input");
        chkBox.type = "checkbox";
        chkBox.value = item.done;
        chkBox.onclick = onClickChkBox;
        chkBox.id = `${item.id}chkBox`;
        item.done ? (chkBox.checked = true) : (chkBox.checked = false);
        todo.setAttribute("key", item.id);
        todo.appendChild(title);
        todo.appendChild(chkBox);
        todo.appendChild(icon);
        doc.$todoList.appendChild(todo);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  });
}

function onClickChkBox(e) {
  const todoList = JSON.parse(localStorage.getItem("todo"));
  let newTodoList = [];
  todoList.map((item) => {
    if (item.id == parseInt(e.target.id)) {
      item.done = !item.done;
    }
    newTodoList.push(item);
  });
  localStorage.clear();
  localStorage.setItem("todo", JSON.stringify(newTodoList));
}
