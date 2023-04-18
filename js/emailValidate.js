const emailHome = document.getElementById("emailHome");
const email = document.getElementById("email");
const emailError = document.getElementById("emailError");
const success = document.querySelector(".box-2 p");

function validateForm() {
  event.preventDefault();

  let isInputValid = true;

  if (validateEmail(email.value) === true) {
    email.style.border = "3px solid green";
    emailError.style.display = "none";
    success.innerHTML =
      "SUBSCRIBED! You will now received notification on your email";
  } else {
    emailError.innerHTML = "please enter correct email address";
    emailError.style.fontSize = "10px";
    emailError.style.color = "red";
    emailError.style.margin = "5px 0px";
    isInputValid = false;
    email.style.border = "3px solid red";
  }

  if (isInputValid === true) {
    console.dir("success");
  } else {
    console.log("failure");
  }
}

emailHome.addEventListener("submit", validateForm);

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}
