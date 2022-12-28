import "./style.scss";
import Calculator from "./core/calc";

/*= =========  Light theme ========== */

document.addEventListener("DOMContentLoaded", () => {
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
});

/*= =========  Calculator ========== */

document.addEventListener("DOMContentLoaded", () => {
  const currentOperandEl = document.querySelector(
    ".calculator-current-operand",
  );
  const clearBtn = document.querySelector(".btn-clear");
  const equalsBtn = document.querySelector(".btn-equals");
  const addMemoryBtn = document.querySelector(".btn-memory-add");
  const subMemoryBtn = document.querySelector(".btn-memory-sub");
  const readMemoryBtn = document.querySelector(".btn-memory-read");
  const cleanMemoryBtn = document.querySelector(".btn-memory-clear");
  const backSpaceBtn = document.querySelector(".btn-backspace");

  const calcContainer = document.querySelector(".calculator");

  const calculator = new Calculator(currentOperandEl);
  calculator.clear();

  calcContainer.addEventListener("click", (e) => {
    const cell = e.target.closest("button");
    if (!cell) return;
    if (cell.dataset.type === "num") {
      calculator.setCurrentOperand(e.target.innerText);
      calculator.renderUi();
    } else if (cell.dataset.operation && cell.dataset.operands === "one") {
      calculator.chooseOperationWithOneOperand(cell.dataset.operation);
      calculator.renderUi();
    } else if (cell.dataset.operation && cell.dataset.operands === "two") {
      const operationSign = cell.innerText;
      calculator.setOperandsForOperation(cell.dataset.operation, operationSign);
      calculator.renderUi();
    }
  });

  equalsBtn.addEventListener("click", () => {
    calculator.compute();
    calculator.clearCurrentOperand();
  });

  addMemoryBtn.addEventListener("click", () => {
    calculator.addMemoryItem();
  });

  subMemoryBtn.addEventListener("click", () => {
    calculator.subMemoryItem();
  });

  readMemoryBtn.addEventListener("click", () => {
    calculator.getMemoryItem();
  });

  cleanMemoryBtn.addEventListener("click", () => {
    calculator.cleanMemory();
  });

  backSpaceBtn.addEventListener("click", () => {
    calculator.deletePrevSymbol();
  });

  clearBtn.addEventListener("click", () => {
    calculator.clear();
    calculator.renderUi();
  });
});
