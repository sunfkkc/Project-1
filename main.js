/*  */
const NewBtn = document.querySelector(".content-header--new");
const ContentFind = document.querySelector(".content-body--modal--find");
const ContentNew = document.querySelector(".content-body--modal--new");
NewBtn.addEventListener("click", () => {
  ContentFind.classList.remove("show");
  ContentNew.classList.add("show");
});

/* get current Position */
let ListCount = localStorage.length;

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
      UpdateTodoList(ListCount);
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

/* 작성 버튼 눌렀을 때 */
const newSubmit = function (e) {
  const newContent = document.getElementById("new-input").value;
  if (!newContent) {
    throw new Error("invalid content");
  }
  const todoList = document.getElementById("new_todoList");
  navigator.geolocation.getCurrentPosition(
    GetPositionOk,
    NoPosition
  ); /* 현재 위치를 불러오는데 시간이 걸려서 바로 리스트에 등록이 안됨 프로미스를 써서 해결해 볼수 있을까..*/
};
const newbtnSubmit = document.querySelector(".modal--new__btn--submit");
newbtnSubmit.addEventListener("click", newSubmit);

/* bring todoList from localstorage */
export function UpdateTodoList(index) {
  const todoList = document.getElementById("new_todoList");
  todoList.innerHTML += `<li key=${index}>${
    JSON.parse(localStorage.getItem(index)).Todo
  } - ${JSON.parse(localStorage.getItem(index)).LocalName}</li>`;
}
const todoList = document.getElementById("new_todoList");
for (let i = 0; i < localStorage.length; i++) {
  UpdateTodoList(i);
}
