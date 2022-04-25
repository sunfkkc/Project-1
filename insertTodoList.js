import * as doc from "./document.js";
import { makeDeleteIcon } from "./delete.js";
import { makeCheckBox } from "./check.js";
import { makeChangeIcon } from "./change.js";
const geocoder = new kakao.maps.services.Geocoder();

/* todolist 배열을 매개변수로 받아서 페이지에 삽입 */
/**
 * 로컬스토리지에 있는 값이 순서대로 삽입되지 않고 랜덤하게 삽입되는 문제 발생
 * forEach와 for of의 차이점을 알수 있었다..
 *
 * forEach문은 콜백 함수를 기다려 주지 않는다...!
 * 또한 forEach문에는 await 키워드를 사용할 수 없다..!
 * for of문과 async await키워드를 사용하여 문제 해결..!
 */
/* const insertTodoList = function (todoList) {
  doc.$todoList.innerHTML = "";
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
}; */
export const asyncInsertTodoList = async function (todoList) {
  doc.$todoList.innerHTML = "";
  for (const item of todoList) {
    const reverseGeo = await getReverseGeocoding(item.longitude, item.latitude);
    const todo = document.createElement("li");

    const todoTitle = document.createElement("span");
    todoTitle.innerText = item.title;
    todoTitle.setAttribute("id", `title${item.id}`);
    /* const title = document.createTextNode(
      item.title + " - " + reverseGeo + " "
    ); */
    const location = document.createTextNode(" - " + reverseGeo);
    todo.appendChild(todoTitle);
    todo.appendChild(location);
    //todoTitle.appendChild(title);
    //todoTitle.setAttribute("value", item.title);

    const chkBox = makeCheckBox(item);
    const deleteIcon = makeDeleteIcon(item);
    const changeIcon = makeChangeIcon(item);

    todo.setAttribute("key", item.id);
    //todo.appendChild(title);
    todo.appendChild(chkBox);
    todo.appendChild(changeIcon);
    todo.appendChild(deleteIcon);

    doc.$todoList.appendChild(todo);
  }
};

/* 위도 경도를 이용한 reverse geocoding */
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
