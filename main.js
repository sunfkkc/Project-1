import * as doc from "./document.js";

if (localStorage.length === 0) {
  localStorage.setItem("todo", JSON.stringify([]));
}
let listCount = JSON.parse(localStorage.getItem("todo")).length;

/* get 위도 경도 */
function getPosition() {
  return new Promise((res, rej) =>
    navigator.geolocation.getCurrentPosition(res, rej)
  );
}

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

const addTodo = function () {
  /* 제출 후 로컬 스토리지 저장 */
  const newContent = doc.newTodo.value;
  if (!newContent || !doc.newTodo) {
    throw new Error("invalid content");
  }
  doc.newBtn.classList.add("hidden");
  doc.newTodo.readOnly = true;
  const loadingLabel = document.createElement("label");
  const loadingText = document.createTextNode("Loading...");
  loadingLabel.appendChild(loadingText);
  doc.$contentNew.appendChild(loadingLabel);
  getPosition()
    .then((pos) => {
      const todo = {
        id: listCount++,
        title: doc.newTodo.value,
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude,
        done: false,
      };
      const todoList = JSON.parse(localStorage.getItem("todo"));
      localStorage.setItem("todo", JSON.stringify([...todoList, todo]));
      doc.$contentNew.removeChild(loadingLabel);
      doc.newBtn.classList.remove("hidden");
      doc.newTodo.readOnly = false;
    })
    .catch((err) => {
      doc.$contentNew.removeChild(loadingLabel);
      throw new Error(err.message);
    });
};
doc.newBtn.addEventListener("click", addTodo);
