onLoadCartNumbers();

displayCart();

const buttonCart = document.querySelector(".checkOut button");

function redirectPageIndex() {
  location.href = "checkout.html";
}

buttonCart.addEventListener("click", redirectPageIndex);
