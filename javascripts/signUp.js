const signUpFormElement = document.getElementById("signup_form");
const signInFormElement = document.getElementById("signin_form1");
const signInButton = document.getElementById("signInButton");
const signUpButton = document.getElementById("signUpButton");

document.getElementById("createSignUpForm").addEventListener("click", event => {
  event.preventDefault();
  signInFormElement.style.display = "none";
  signUpFormElement.style.display = "block";
});

document.getElementById("removeSignUpForm").addEventListener("click", event => {
  event.preventDefault();
  signInFormElement.style.display = "block";
  signUpFormElement.style.display = "none";
});
signInButton.addEventListener("click", event => {
  event.preventDefault();
  window.location = "./dashboard.html";
});
