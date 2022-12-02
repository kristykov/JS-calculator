import "./style.scss";

/*= =========  Light theme ========== */

const calculatorEl = document.querySelector(".calculator");
const themeSwitcher = document.querySelector(".switch");

themeSwitcher.addEventListener("click", () => {
  if (themeSwitcher.checked === true) {
    calculatorEl.classList.add("light-theme");
  } else {
    calculatorEl.classList.remove("light-theme");
  }
});
