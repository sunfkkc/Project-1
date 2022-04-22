/* element */
const $contentFind = document.querySelector(".content-body--modal--find");
const $contentNew = document.querySelector(".content-body--modal--new");
const $todoList = document.querySelector(".todoList");

/* btn */
const headerNewBtn = document.querySelector(".content-header--new");
const newBtn = document.querySelector(".modal--new__btn--submit");
const headerFindBtn = document.querySelector(".content-header--find");
const findBtn = document.querySelector(".modal--find__btn--submit");

/* eventListner */
headerNewBtn.addEventListener("click", () => {
  $contentFind.classList.remove("show");
  $contentNew.classList.add("show");
});
/* input */
const newTodo = document.querySelector(".modal--new__input");
const findTodo = document.querySelector(".modal--find__input");

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
};
