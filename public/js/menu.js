"user strict";

const menuBtn = document.querySelectorAll(".menu-btn");
const menuOverlay = document.querySelector(".menu-overlay");

menuBtn.forEach((btn) => {
  btn.addEventListener("click", displayMenu);
});

function displayMenu() {
  menuOverlay.style.transform === "translateX(105%)" ||
  menuOverlay.style.transform === ""
    ? (menuOverlay.style.transform = "translateX(0)")
    : (menuOverlay.style.transform = "translateX(105%)");
}
