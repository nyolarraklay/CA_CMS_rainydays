function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  console.log(cartItems);
  let container = document.querySelector(".products");
  let basketTotal = document.querySelector(".totalBasket");
  let cartCost = localStorage.getItem("totalCost");
  let checkout = document.querySelector(".checkout");

  if (cartItems && container) {
    container.innerHTML = "";
    Object.values(cartItems).map((item) => {
      container.innerHTML += ` 
<div class ="product>
  <ion-icon name="close-circle-outline"></ion-icon>

 <img src="${item.images[0].src}" alt="${item.name}"> <p>${item.name} </p>
</div>
      <div class="price">${item.prices.price}.00nok</div>
      <div class="quantity"><ion-icon class="decrease" name="arrow-back-circle-outline"></ion-icon><span>${
        item.parent
      }</span><ion-icon class="increase" name="arrow-forward-circle-outline"></ion-icon></div>
      <div class="total">${item.parent * item.prices.price}.00nok</div>
      `;
      basketTotal.innerHTML += `<div class="basketTotalContainer"> <h4 class ="basketTotalTitle"> Basket Total </h4>
                <h4 class="basketTotal">${cartCost}.00nok</h4>
      </div>`;
    });
  }

  checkout.innerHTML += `<div class="checkOut"> <button class="pay">CheckOut</button> <a href="products.html">continue shopping</a></div>`;
  const checkoutCart = document.querySelector(".checkOut .pay");

  function redirectPageIndex() {
    location.href = "checkout.html";
  }

  checkoutCart.addEventListener("click", redirectPageIndex);
}

displayCart();
