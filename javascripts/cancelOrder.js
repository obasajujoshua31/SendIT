const cancelParcelOrder = event => {
  event.preventDefault();
  confirm("are you sure you want to Cancel this Order?");
};

document
  .getElementById("cancelParcel")
  .addEventListener("click", cancelParcelOrder);
