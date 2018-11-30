const viewUpdate = document.getElementById("viewUpdate");
viewUpdate.addEventListener("click", event => {
  event.preventDefault();
  alert("The View update was clicked");
});
const submitAdminUpdate = document.getElementById("submitAdminUpdate");
submitAdminUpdate.addEventListener("click", event => {
  event.preventDefault();

  const value = document.querySelector('input[name="status"]:checked').value;

  const toNewPlaces = document.getElementById("to_new_places").value;
  alert(toNewPlaces);
  alert(value);
});
