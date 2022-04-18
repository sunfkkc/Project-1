/* get current Position */
const position = {
  latitude: 0,
  longitude: 0,
};
const GetPositionOk = function (pos) {
  position.latitude = pos.coords.latitude;
  position.longitude = pos.coords.longitude;
  const newContent = document.getElementById("new-input").value;
  localStorage.setItem(newContent, JSON.stringify(position));
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
  navigator.geolocation.getCurrentPosition(GetPositionOk, NoPosition);
  todoList.innerHTML += `<li>${newContent}</li>`;
};
const newbtnSubmit = document.querySelector(".modal--new__btn--submit");
newbtnSubmit.addEventListener("click", newSubmit);

/* bring todoList from localstorage */
console.log(localStorage.key(3));
