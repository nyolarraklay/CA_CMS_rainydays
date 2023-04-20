import {
  productsUrl,
  getProducts,
  cartNumbers,
  onLoadCartNumbers,
  totalCost,
  setItems,
  fullPagesFeatured,
  getFeaturedProducts,
  searchButton,
  createProductHTML,
  createProductsHTML,
  createFeaturedProductHTML,
  createFeaturedProductsHTML,
  container,
} from "./import.js";

const sortFormA = document.querySelector(".atoz");
const sortFormB = document.querySelector(".ztoa");
const sortFormC = document.querySelector(".highP");
const sortFormD = document.querySelector(".lowP");

async function main() {
  const products = await getProducts();
  createProductsHTML(products);
  // featuredProduct
  const featuredProduct = await getFeaturedProducts();
  createFeaturedProductsHTML(featuredProduct);

  // sort
  sortFormA.addEventListener("click", function () {
    container.innerHTML = "";
    const sortedProducts = products.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });
    console.log(sortedProducts);

    createProductsHTML(sortedProducts);
  });
  sortFormB.addEventListener("click", function () {
    container.innerHTML = "";
    const sortedProducts = products.sort(function (a, b) {
      if (a.name < b.name) {
        return 1;
      } else if (a.name > b.name) {
        return -1;
      } else {
        return 0;
      }
    });
    console.log(sortedProducts);

    createProductsHTML(sortedProducts);
  });
  sortFormC.addEventListener("click", function () {
    container.innerHTML = "";
    const sortedProducts = products.sort(function (a, b) {
      if (a.prices.price < b.prices.price) {
        return 1;
      } else if (a.prices.price > b.prices.price) {
        return -1;
      } else {
        return 0;
      }
    });
    console.log(sortedProducts);

    createProductsHTML(sortedProducts);
  });
  sortFormD.addEventListener("click", function () {
    container.innerHTML = "";
    const sortedProducts = products.sort(function (a, b) {
      if (a.prices.price > b.prices.price) {
        return 1;
      } else if (a.prices.price < b.prices.price) {
        return -1;
      } else {
        return 0;
      }
    });
    console.log(sortedProducts);

    createProductsHTML(sortedProducts);
  });

  let cart = document.querySelectorAll(".addCart");

  searchButton.onclick = function () {
    const searchInput = document.querySelector("#searchInput");
    console.log(searchInput);
  };

  for (let i = 0; i < cart.length; i++) {
    cart[i].addEventListener("click", () => {
      cartNumbers(products[i]);
      totalCost(products[i]);
    });
  }
}

main();

const sort = document.querySelector(".dropbtn");
const dropDown = document.querySelector("#myDropdown");

sort.onclick = function () {
  dropDown.classList.toggle("show");
};

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    dropDown.classList.remove("show");
  }
};
