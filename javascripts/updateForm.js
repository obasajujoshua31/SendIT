const submitUpdate = document.getElementById("submitUpdate");
submitUpdate.addEventListener("click", event => {
  event.preventDefault();
  confirm("Are you sure you want to Update the form");
});

const cancelUpdateForm = document.getElementById("cancelUpdateForm");
cancelUpdateForm.addEventListener("click", event => {
  event.preventDefault();
  confirm("Are you sure you want to cancel this order");
});
