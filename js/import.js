const base = "http://rainy-dayswordpress.local";
const wCommerceBase = "/wp-json/wc/store";
const productBase = "/products";
const featureBase = "?featured=true";

const pagesBase = "/wp-json/wp/v2/pages";

const productsUrl = base + wCommerceBase + productBase;
const fullPagesUrl = base + pagesBase;
const fullPagesFeatured = base + wCommerceBase + productBase + featureBase;

async function getProducts() {
  const response = await fetch(productsUrl);
  const products = await response.json();

  return products;
}

async function getFeaturedProducts() {
  const response = await fetch(fullPagesFeatured);
  const featuredProducts = await response.json();

  return featuredProducts;
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cartOrder").textContent = productNumbers;
  }
}

function cartNumbers(product, action) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (action == "decrease") {
    localStorage.setItem("cartNumbers", productNumbers - 1);
    document.querySelector(".cartOrder").textContent = productNumbers - 1;
  } else if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cartOrder").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cartOrder").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.name] == undefined) {
      cartItems = {
        ...cartItems,
        [product.name]: product,
      };
    }
    cartItems[product.name].parent += 1;
  } else {
    product.parent = 1;
    cartItems = {
      [product.name]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product, action) {
  let cartCost = localStorage.getItem("totalCost");
  let productsPrice = product.prices.price;
  if (action == "decrease") {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost - productsPrice);
  } else if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + productsPrice);
  } else {
    localStorage.setItem("totalCost", productsPrice);
  }
}

export {
  base,
  productBase,
  pagesBase,
  productsUrl,
  fullPagesUrl,
  getProducts,
  totalCost,
  setItems,
  cartNumbers,
  onLoadCartNumbers,
  fullPagesFeatured,
  getFeaturedProducts,
};
