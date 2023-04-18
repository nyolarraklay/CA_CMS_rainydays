const contact = document.querySelector(".SM-box1");
const cartProduct = document.querySelector(".SM-box2 p");

const shoppingBox = document.querySelector(".SM-box3");
const ourProduct = document.querySelector(".productBox");

function redirectToCart() {
  location.href = "cart.html";
}

cartProduct.addEventListener("click", redirectToCart);

function redirectToContact() {
  location.href = "contact.html";
}

contact.addEventListener("click", redirectToContact);

function redirectToAbout() {
  location.href = "contact.html";
}

shoppingBox.addEventListener("click", redirectToAbout);

function redirectToProduct() {
  location.href = "products.html";
}

ourProduct.addEventListener("click", redirectToProduct);

const icon = document.querySelector(".hamburger");
const navigation = document.querySelector(".navMenu");

icon.addEventListener("click", () => {
  icon.classList.toggle("active");
  navigation.classList.toggle("active");
});

document.querySelectorAll(".navLink").forEach((n) =>
  n.addEventListener("click", () => {
    icon.classList.remove("active");
    navigation.classList.remove("active");
  })
);
