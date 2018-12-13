const submitAdminUpdate = document.getElementById("submitAdminUpdate");
submitAdminUpdate.addEventListener("click", event => {
  event.preventDefault();

  const value = document.querySelector('input[name="status"]:checked').value;

  const toNewPlaces = document.getElementById("to_new_places").value;
  alert(toNewPlaces);
  alert(value);
});
const adminUpdateForm = document.getElementById("admin_update_form");
const showAdminUpdateForm = () => {
  adminUpdateForm.style.display = "block";
};

const adminViewParcelButtonList = document.getElementsByClassName(
  "admin_view_parcel"
);
for (let i = 0; i < adminViewParcelButtonList.length; i++) {
  adminViewParcelButtonList[i].addEventListener("click", showAdminUpdateForm);
}
const closeAdminUpdateForm = () => {
  adminUpdateForm.style.display = "none";
};

document
  .getElementById("closeButton3")
  .addEventListener("click", closeAdminUpdateForm);
