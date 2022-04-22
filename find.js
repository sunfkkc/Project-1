import * as doc from "./document.js";
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
  doc.$contentNew.classList.remove("show");
  doc.$todoList.innerHTML = "";
  const todoList = JSON.parse(localStorage.getItem("todo"));
  todoList.forEach((item) => {
    getReverseGeocoding(item.longitude, item.latitude).then((reverseGeo) => {
      const todo = document.createElement("li");
      const title = document.createTextNode(item.title + " - " + reverseGeo);
      todo.setAttribute("key", item.id);
      todo.appendChild(title);
      doc.$todoList.appendChild(todo);
    });
  });
}
