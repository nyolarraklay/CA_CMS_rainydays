import {
  productsUrl,
  getProducts,
  cartNumbers,
  onLoadCartNumbers,
  totalCost,
  setItems,
  fullPagesFeatured,
  getFeaturedProducts,
} from "./import.js";

function createProductHTML(product) {
  const container = document.querySelector(".containerCa");

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

async function main() {
  const products = await getProducts();
  createProductsHTML(products);
  const featuredProduct = await getFeaturedProducts();
  createFeaturedProductsHTML(featuredProduct);
  let cart = document.querySelectorAll(".addCart");

  for (let i = 0; i < cart.length; i++) {
    cart[i].addEventListener("click", () => {
      cartNumbers(products[i]);
      totalCost(products[i]);
    });
  }
}

main();
