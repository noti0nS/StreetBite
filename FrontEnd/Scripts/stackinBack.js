let iframe = document.querySelector(".iframe");
let homeButton = document.querySelector("#homeButton");
let menuButton = document.querySelector("#menuButton");
let expandBarButton = document.querySelector(".expandBarButton");
let ordersButton = document.querySelector("#ordersButton");
let sideBar = document.querySelector(".sideBar");
let settingsButton = document.querySelector("#settingsButton");
let navBarButtons = document.querySelectorAll(".navBarButtons");

//Change Iframe Source
homeButton.addEventListener("click", () => {
  iframe.src = "../Pages/Iframes/home.html";
});
menuButton.addEventListener("click", () => {
  iframe.src = "../Pages/Iframes/menu.html";
});
ordersButton.addEventListener("click", () => {
  iframe.src = "../Pages/Iframes/requests.html";
});
