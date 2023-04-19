const apiBase = "http://rainydays.nyolosorio.no";
const wooCommerceBase = "/wp-json/wc/store";
const productsBase = "/products/";

const pageBase = "/wp-json/wp/v2/pages";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

console.log(id);

const productUrl = apiBase + wooCommerceBase + productsBase;
const fullPageUrl = apiBase + pageBase;
const urlId = productUrl + id;

async function getProduct() {
  const response = await fetch(urlId);
  const products = await response.json();

  return products;
}

function createProductHTML(product) {
  const container = document.querySelector(".containerDetails");
  const head = document.querySelector("title");
  const contentCa = document.querySelector(".contentCa");
  head.innerHTML = product.name;

  const productContainer = document.createElement("div");
  productContainer.classList.add("cardDetails");
  productContainer.id = product.id;

  const a = document.createElement("a");
  a.href = "products.html";
  a.innerText = `back to Jackets`;
  const heading = document.createElement("h1");
  heading.innerHTML = "Rainy Days jacket";

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
  price.classList.add("priceDetails");
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

  price.append(regularPrice, salePrice);
  productContainer.append(price);

  const description = document.createElement("div");
  description.classList.add("description");

  const descriptionShort = document.createElement("h3");
  descriptionShort.classList.add("descriptionShort");
  const shortText = product.short_description;
  const newText = shortText.replace("<p>", "").replace("</p>", "");
  descriptionShort.innerText = newText;

  const descriptionLong = document.createElement("p");
  descriptionLong.classList.add("descriptionLong");
  const longText = product.description;
  const newLongText = longText
    .replace("<p>", "")
    .replace("</p>", "")
    .replace("&#8217;", "'")
    .replace("&#8217;", "'");

  descriptionLong.innerText = newLongText;

  const addCart = document.createElement("a");
  addCart.href = "#";
  addCart.classList.add("addToCart");

  addCart.innerText = "add to cart";

  description.append(descriptionShort, descriptionLong, addCart);

  contentCa.prepend(heading, a);

  container.append(productContainer, description);

  console.log(product);
}

async function main() {
  const products = await getProduct();
  createProductHTML(products);

  let cart = document.querySelector(".addToCart");

  cart.addEventListener("click", () => {
    onLoadCartNumbers();
    cartNumbers(products);
  });
}

main();

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
}
