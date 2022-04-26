/* element */
const $contentFind = document.querySelector(".content-body--modal--find");
const $contentNew = document.querySelector(".content-body--modal--new");
const $todoList = document.querySelector(".todolist");

/* btn */
const headerNewBtn = document.querySelector(".content-header--new");
const newBtn = document.querySelector(".modal--new__btn--submit");
const headerFindBtn = document.querySelector(".content-header--find");
const findBtn = document.querySelector(".modal--find__btn--submit");
const deleteBtn = document.querySelector(".fa-trash");

/* eventListner */
headerNewBtn.addEventListener("click", () => {
  $contentNew.classList.remove("hidden");
  $todoList.classList.add("hidden");
  //$todoList.classList.add("hidden");
});
headerFindBtn.addEventListener("click", () => {
  $contentNew.classList.add("hidden");
  $todoList.classList.remove("hidden");
});
/* input */
const newTodo = document.querySelector(".modal--new__input");
const findTodo = document.querySelector(".modal--find__input");

/*isLoading */
const loadingLabel = document.createElement("label");
const loadingText = document.createTextNode("Loading...");
loadingLabel.appendChild(loadingText);

export {
  $contentFind,
  $contentNew,
  $todoList,
  headerNewBtn,
  newBtn,
  headerFindBtn,
  findBtn,
  newTodo,
  findTodo,
  deleteBtn,
  loadingLabel,
};
