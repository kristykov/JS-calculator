import "./style.scss";
import Calculator from "./core/calc";

function initTheme() {
  const calculatorEl = document.querySelector(".calculator");
  const themeSwitcher = document.querySelector(".switch");

  themeSwitcher.addEventListener("click", () => {
    if (themeSwitcher.checked === true) {
      calculatorEl.classList.remove("dark-theme");
      calculatorEl.classList.add("light-theme");
    } else {
      calculatorEl.classList.remove("light-theme");
      calculatorEl.classList.add("dark-theme");
    }
  });
}

function initCalc() {
  const calculator = new Calculator(
    document.querySelector(".calculator-current-operand"),
  );

  const calcContainer = document.querySelector(".calculator");
  calcContainer.addEventListener("click", (e) => {
    const cell = e.target.closest("button");
    if (!cell) return;
    if (cell.dataset.type === "num") {
      calculator.setCurrentOperand(e.target.innerText);
      calculator.renderUi();
    } else if (cell.dataset.operation && cell.dataset.operation === "equals") {
      calculator.compute();
      calculator.clearCurrentOperand();
    } else if (
      cell.dataset.operation &&
      cell.dataset.operation === "backspace"
    ) {
      calculator.deletePrevSymbol();
    } else if (cell.dataset.operation && cell.dataset.operation === "clear") {
      calculator.clear();
      calculator.renderUi();
    } else if (cell.dataset.operation && cell.dataset.operands === "one") {
      calculator.chooseOperationWithOneOperand(cell.dataset.operation);
      calculator.renderUi();
    } else if (cell.dataset.operation && cell.dataset.operands === "two") {
      const operationSign = cell.innerText;
      calculator.setOperandsForOperation(cell.dataset.operation, operationSign);
      calculator.renderUi();
    } else if (
      cell.dataset.operation &&
      cell.dataset.operation === "memory-add"
    ) {
      calculator.addMemoryItem();
    } else if (
      cell.dataset.operation &&
      cell.dataset.operation === "memory-sub"
    ) {
      calculator.subMemoryItem();
    } else if (
      cell.dataset.operation &&
      cell.dataset.operation === "memory-read"
    ) {
      calculator.getMemoryItem();
    } else if (
      cell.dataset.operation &&
      cell.dataset.operation === "memory-clear"
    ) {
      calculator.cleanMemory();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCalc();
});
