/* get current Position */
let ListCount = 0;

const position = {
  latitude: 0,
  longitude: 0,
  LocalName: "",
  Todo: "",
};

const geocoder = new kakao.maps.services.Geocoder();
const GetPositionOk = function (pos) {
  position.latitude = pos.coords.latitude;
  position.longitude = pos.coords.longitude;
  position.Todo = document.getElementById("new-input").value;
  const callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      position.LocalName = result[0].address_name;
      localStorage.setItem(ListCount, JSON.stringify(position));
      ListCount++;
    }
  };
  geocoder.coord2RegionCode(
    pos.coords.longitude,
    pos.coords.latitude,
    callback
  );
};
const NoPosition = function (err) {
  console.log(err);
  throw new Error(err.message);
};

/* content body modal new */
const newSubmit = function (e) {
  const newContent = document.getElementById("new-input").value;
  if (!newContent) {
    throw new Error("invalid content");
  }
  const todoList = document.getElementById("new_todoList");
  todoList.innerHTML += `<li>${newContent}</li>`;
  navigator.geolocation.getCurrentPosition(GetPositionOk, NoPosition);
};
const newbtnSubmit = document.querySelector(".modal--new__btn--submit");
newbtnSubmit.addEventListener("click", newSubmit);

/* bring todoList from localstorage */

const todoList = document.getElementById("new_todoList");
for (let i = 0; i < localStorage.length; i++) {
  todoList.innerHTML += `<li key=${i}>${
    JSON.parse(localStorage.getItem(i)).Todo
  }</li>`;
}
