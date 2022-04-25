export const makeChangeIcon = function (item) {
  const changeIcon = document.createElement("i");
  changeIcon.setAttribute("class", "fas fa-solid fa-pen");
  changeIcon.onclick = changeTodo;
  changeIcon.id = `${item.id}changeIcon`;
  return changeIcon;
};

function changeTodo(e) {
  const x = parseInt(e.target.id);
  const y = document.querySelector(".changeTitle");
  if (y && x !== parseInt(y.id)) {
    return alert("수정을 완료해 주세요!"); //수정중 다른 changeIcon을 눌렀을 때
  }
  if (y) {
    return confirmChange(); //수정중 현재 changeIcon을 눌렀을 때
  }
  /**
   * 수정 아이콘을 눌렀을 때 input박스로 변환이 되고
   * input박스 안에 원래 value가 담김
   */
  const todoTitle = document.querySelector(`#title${parseInt(e.target.id)}`);
  const changeTitleBox = document.createElement("input");
  changeTitleBox.type = "text";
  changeTitleBox.setAttribute("class", "changeTitle");
  changeTitleBox.setAttribute("id", `${parseInt(e.target.id)}changeTitleBox`);
  changeTitleBox.value = todoTitle.innerHTML;
  changeTitleBox.addEventListener("keyup", inputEnterKey);
  todoTitle.innerHTML = "";
  todoTitle.appendChild(changeTitleBox);
  changeTitleBox.focus();
}

function inputEnterKey(e) {
  if (e.keyCode === 13) {
    //enter 키를 눌렀을 때
    confirmChange();
  }
}

function confirmChange(e) {
  const changeTitleBox = document.querySelector(".changeTitle");
  const todoTitle = document.querySelector(
    `#title${parseInt(changeTitleBox.id)}`
  );
  const todoList = JSON.parse(localStorage.getItem("todo"));
  todoList[parseInt(changeTitleBox.id)].title = changeTitleBox.value;
  localStorage.clear();
  localStorage.setItem("todo", JSON.stringify(todoList));
  const changeTitle = document.createTextNode(changeTitleBox.value);
  todoTitle.appendChild(changeTitle);
  todoTitle.removeChild(changeTitleBox);
}
