const base = "https://rainydays.nyolosorio.no";
const wCommerceBase = "/wp-json/wc/store";
const productBase = "/products";
const featureBase = "?featured=true";

const pagesBase = "/wp-json/wp/v2/pages";

const productsUrl = base + wCommerceBase + productBase;
const fullPagesUrl = base + pagesBase;
const fullPagesFeatured = base + wCommerceBase + productBase + featureBase;

const searchButton = document.querySelector(".searchButton");
const container = document.querySelector(".containerCa");

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

function createProductHTML(product) {
  const productContainer = document.createElement("a");
  productContainer.href = `details.html?id=${product.id}`;
  productContainer.classList.add("productImage");
  productContainer.classList.add("cards");
  productContainer.id = product.id;

  const title = document.createElement("h2");
  title.innerText = product.name;
  productContainer.append(title);

  for (let i = 0; i < product.images.length; i++) {
    const imgData = product.images[i];
    const img = document.createElement("img");
    img.src = imgData.src;
    img.alt = imgData.alt;
    productContainer.append(img);
  }

  const price = document.createElement("div");
  price.classList.add("price");
  const regularPrice = document.createElement("p");
  regularPrice.innerText = "NOK" + " " + product.prices.regular_price;
  const salePrice = document.createElement("p");
  salePrice.innerText = "NOK" + " " + product.prices.sale_price;

  if (regularPrice.innerText !== salePrice.innerText) {
    regularPrice.style.display = "block";
    regularPrice.style.textDecoration = "line-through";
  } else {
    regularPrice.style.display = "none";
  }

  const addCart = document.createElement("a");
  addCart.href = "#";
  addCart.classList.add("addCart");
  addCart.classList.add("cart1");

  addCart.innerText = "add to cart";

  productContainer.append(addCart);

  price.append(regularPrice, salePrice);
  productContainer.append(price);
  container.append(productContainer);
}

function createProductsHTML(products) {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    createProductHTML(product);
  }
}

function createFeaturedProductsHTML(products) {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    createFeaturedProductHTML(product);
  }
}
function createFeaturedProductHTML(product) {
  const container = document.querySelector(".featured");
  const featuredProduct = document.createElement("div");
  featuredProduct.classList.add("featured");
  const productContainerFeatured = document.createElement("a");
  productContainerFeatured.href = `details.html?id=${product.id}`;
  productContainerFeatured.classList.add("productImage");
  productContainerFeatured.classList.add("cards");
  productContainerFeatured.id = product.id;

  const titleFeatured = document.createElement("h2");
  titleFeatured.innerText = product.name;
  productContainerFeatured.append(titleFeatured);

  for (let i = 0; i < product.images.length; i++) {
    const imgData = product.images[i];
    const img = document.createElement("img");
    img.src = imgData.src;
    img.alt = imgData.alt;
    productContainerFeatured.append(img);
  }

  const categories = document.createElement("h3");
  categories.classList.add("categoriesFeatured");
  categories.innerHTML = product.categories[0].name;
  productContainerFeatured.append(categories);

  container.append(productContainerFeatured);
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
  searchButton,
  createProductHTML,
  createProductsHTML,
  createFeaturedProductHTML,
  createFeaturedProductsHTML,
  container,
};
