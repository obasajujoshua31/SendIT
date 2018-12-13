const newForm = document.getElementById("create_form");
const createForm = () => {
  newForm.style.display = "block";
};
document
  .getElementById("create_new_form")
  .addEventListener("click", createForm);
const closeForm = () => {
  newForm.style.display = "none";
};
const submitParcelOrder = event => {
  event.preventDefault();
  alert("This form is about to the submitted");
};
document.getElementById("closeButton").addEventListener("click", closeForm);
document
  .getElementById("create_form_button")
  .addEventListener("click", submitParcelOrder);
