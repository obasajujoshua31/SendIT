const updateForm = document.getElementById("update_form");
const showUpdateForm = () => {
  updateForm.style.display = "block";
};
const showUpdateFormList = document.getElementsByClassName("view_parcel");

for (let i = 0; i < showUpdateFormList.length; i++) {
  showUpdateFormList[i].addEventListener("click", showUpdateForm);
}

const closeUpdateForm = () => {
  updateForm.style.display = "none";
};
document
  .getElementById("closeButton2")
  .addEventListener("click", closeUpdateForm);
const submitUpdate = event => {
  event.preventDefault();
  alert("this submit button was clicked");
};
document
  .getElementById("submitUpdateButton")
  .addEventListener("click", submitUpdate);
