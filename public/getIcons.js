export const makeChangeIcon = function (item) {
  const changeIcon = document.createElement("i");
  changeIcon.setAttribute("class", "fas fa-solid fa-pen");
  changeIcon.id = `${item.id}changeIcon`;
  return changeIcon;
};

export const makeCheckBox = function (item) {
  const chkBox = document.createElement("input");
  chkBox.type = "checkbox";
  chkBox.value = item.done;
  chkBox.id = `${item.id}chkBox`;
  chkBox.setAttribute("class", "chkBox");
  item.done ? (chkBox.checked = true) : (chkBox.checked = false);
  return chkBox;
};

export const makeDeleteIcon = function (item) {
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-solid fa-trash");
  deleteIcon.id = `${item.id}deleteIcon`;
  return deleteIcon;
};
