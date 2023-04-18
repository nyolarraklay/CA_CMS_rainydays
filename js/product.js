const men = document.querySelector(".gender");
const women = document.querySelector(".girl");
const jacket = document.querySelector(".winter-jacket");

function linkWomen() {
  women.style.textDecoration = "underline";
  women.style.color = "red";
  women.style.fontSize = "30px";
  men.style.textDecoration = "none";
  men.style.color = "black";
  men.style.fontSize = "20px";
  crumbs.innerHTML = "Women";
  jacket.style.backgroundImage = `url("../images/jackets/photo-1481174228429-b2c3f5680a7a.avif")`;
}

function linkmen() {
  men.style.textDecoration = "underline";
  men.style.color = "red";
  men.style.fontSize = "30px";
  women.style.textDecoration = "none";
  women.style.color = "black";
  women.style.fontSize = "20px";
  crumbs.innerHTML = "Men";
  jacket.style.backgroundImage = `url("../images/jackets/WINTER\ RED.webp")`;
}

women.addEventListener("click", linkWomen);
men.addEventListener("click", linkmen);

// outdoor buttons
const winter = document.querySelector(".winterButton");
const rain = document.querySelector(".rainButton");
const summer = document.querySelector(".summerButton");
const autumn = document.querySelector(".autumnButton");
const ski = document.querySelector(".skiButton");
const canoe = document.querySelector(".canoeButton");
const hiking = document.querySelector(".hikingButton");
const camping = document.querySelector(".campingButton");
const crumbs = document.querySelector(".crumbs");
const outdoor = document.querySelector(".outdoor");
const breadcrumbs = document.querySelector(".breadcrumbs h2");

const winter1 = (weather) => {
  outdoor.innerHTML = "Winter";
};
const rain1 = (weather) => {
  outdoor.innerHTML = "Rain";
};
const summer1 = (weather) => {
  outdoor.innerHTML = "Summer";
};
const autumn1 = (weather) => {
  outdoor.innerHTML = "Autumn";
};
const ski1 = (weather) => {
  outdoor.innerHTML = "Skiing";
};
const canoe1 = (weather) => {
  outdoor.innerHTML = "Canoeing";
};
const hiking1 = (weather) => {
  outdoor.innerHTML = "Hiking";
};
const camping1 = (weather) => {
  outdoor.innerHTML = "Camping";
};

winter.addEventListener("click", winter1);
summer.addEventListener("click", summer1);
autumn.addEventListener("click", autumn1);
ski.addEventListener("click", ski1);
canoe.addEventListener("click", canoe1);
hiking.addEventListener("click", hiking1);
camping.addEventListener("click", camping1);
rain.addEventListener("click", rain1);

function redirectPageIndex() {
  location.href = "index.html";
}

breadcrumbs.addEventListener("click", redirectPageIndex);

// content
