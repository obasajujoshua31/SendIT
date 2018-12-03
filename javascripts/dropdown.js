const profileDropdown = document.getElementById("profile_dropdown");
const dropDown = document.getElementById("dropdown");

window.document.addEventListener("click", e => {
  if (e.target.id === "profile_dropdown") {
    dropDown.style.display = "block";
  } else {
    dropDown.style.display = "none";
  }
});
