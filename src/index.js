import "./style.scss";
import factorial from "./factorial";

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

/*= =========  Calculator ========== */

class Calculator {
  currentOperand = "";

  rightOperand = "";

  leftOperand = "";

  constructor(currentOperandEl) {
    this.currentOperandEl = currentOperandEl;
  }

  clear() {
    this.currentOperand = "";
    this.leftOperand = "";
    this.operation = undefined;
    if (this.currentOperandEl.classList.contains("medium-font")) {
      this.currentOperandEl.classList.remove("medium-font");
    }
    this.updateUi();
  }

  addNumber(num) {
    if (num === "." && this.currentOperand.toString().includes(".")) {
      return;
    }

    if (this.currentOperand === "") {
      this.currentOperand = num;
      return;
    }
    if (this.currentOperand.includes("√")) {
      this.currentOperand = num.toString() + this.currentOperand;
      return;
    }

    this.currentOperand += num.toString();
    if (this.currentOperand.length > 16) {
      this.currentOperand = this.currentOperand.slice(0, 16);
    }
  }

  operationValidation(operation) {
    let validatedOperation;
    if (operation.includes("<sup>y")) {
      validatedOperation = "^";
    } else if (operation.includes("<span>√")) {
      validatedOperation = "√";
    } else {
      validatedOperation = operation;
    }
    this.getOperationTwoOperators(validatedOperation);
  }

  getOperationOneOperator(operation) {
    let res;
    const curr = parseFloat(this.currentOperand);
    if (Number.isNaN(curr)) {
      return;
    }
    switch (operation.trim()) {
      case "x<sup>3</sup>":
        res = curr ** 3;
        break;
      case "x<sup>2</sup>":
        res = curr ** 2;
        break;
      case "%":
        res = curr / 100;
        break;
      case "<sup>+</sup>/-":
        res = curr > 0 ? -curr : Math.abs(curr);
        break;
      case "x!":
        try {
          res = factorial(curr);
        } catch (e) {
          console.log(e);
        }
        break;
      case '<sup class="superscript-root">2</sup><span>√</span><span>x</span>':
        res = Math.sqrt(curr);
        break;
      case '<sup class="superscript-root">3</sup><span>√</span><span>x</span>':
        res = Math.cbrt(curr);
        break;
      case "<sup>1</sup>/<span>x</span>":
        res = 1 / curr;
        break;
      case "10<sup>x</sup>":
        res = 10 ** curr;
        break;
      default:
        return;
    }
    if (res.toString().length > 5 || res % 1 !== 0) {
      res = res.toFixed(7);
    } else if (res === Infinity) {
      res = "Error";
    }

    this.currentOperand = res;
  }

  getOperationTwoOperators(operation) {
    if (!this.currentOperand) {
      return;
    }
    if (this.leftOperand === "" && this.rightOperand === "") {
      this.leftOperand = this.currentOperand;
      if (operation !== "√") {
        this.currentOperand += operation;
      } else {
        this.currentOperand = `√${this.currentOperand.toString()}`;
      }
    } else if (this.leftOperand !== "" && this.rightOperand === "") {
      this.rightOperand = this.currentOperand.slice(
        this.leftOperand.toString().length + 1,
      );
      if (!this.rightOperand) {
        return;
      }
      this.compute();
      this.currentOperand += operation;
    }
    this.operation = operation;
    this.updateUi();
  }

  compute() {
    let res;

    if (this.currentOperand.includes("√")) {
      this.rightOperand = this.leftOperand;
      this.leftOperand = this.currentOperand.slice(0, this.rightOperand.length);
    }
    if (this.rightOperand === "") {
      this.rightOperand = this.currentOperand
        .toString()
        .slice(this.leftOperand.length + 1);
    }
    const prev = parseFloat(this.leftOperand);
    const curr = parseFloat(this.rightOperand);
    if (!prev || !curr) {
      return;
    }

    switch (this.operation) {
      case "+":
        res = prev + curr;
        break;
      case "-":
        res = prev - curr;
        break;
      case "*":
        res = prev * curr;
        break;
      case "/":
        res = prev / curr;
        break;
      case "^":
        res = prev ** curr;
        break;
      case "√":
        res = curr ** (1 / prev);
        break;
      default:
        return;
    }
    this.currentOperand = res;
    this.leftOperand = res;
    this.rightOperand = "";
  }

  equal() {
    this.leftOperand = "";
  }

  addMemoryItem() {
    let newMemoryItem;
    if (!localStorage.getItem("memoryItem")) {
      localStorage.setItem("memoryItem", this.currentOperand);
    } else {
      newMemoryItem =
        Number(localStorage.getItem("memoryItem")) +
        Number(this.currentOperand);
      localStorage.setItem("memoryItem", newMemoryItem);
    }
    this.currentOperand = "";
  }

  subMemoryItem() {
    let newMemoryItem;
    if (!localStorage.getItem("memoryItem")) {
      localStorage.setItem(
        "memoryItem",
        this.currentOperand > 0
          ? -this.currentOperand
          : Math.abs(this.currentOperand),
      );
    } else {
      newMemoryItem =
        Number(localStorage.getItem("memoryItem")) -
        Number(this.currentOperand);
      localStorage.setItem("memoryItem", newMemoryItem);
    }
    this.currentOperand = "";
  }

  getMemoryItem() {
    this.currentOperand = localStorage.getItem("memoryItem");
    this.updateUi();
    this.currentOperand = "";
  }

  cleanMemory() {
    localStorage.removeItem("memoryItem");
    this.currentOperand = "";
  }

  updateUi() {
    // if(this.currentOperand.length < 20) {
    //   this.currentOperandEl.
    // }
    if (this.currentOperand === undefined) {
      this.currentOperand = "Error";
    }
    if (this.currentOperand.toString().length > 7) {
      this.currentOperandEl.classList.add("medium-font");
    }
    if (this.currentOperand !== "" || this.currentOperand !== "Error") {
      this.currentOperandEl.innerText = this.currentOperand;
    }
  }
}

const currentOperandEl = document.querySelector(".calculator-current-operand");
const numberBtns = document.querySelectorAll(".btn-num");
const clearBtn = document.querySelector(".btn-clear");
const operationBtnsTwoOperators = document.querySelectorAll(".btn-operation");
const equalsBtn = document.querySelector(".btn-equals");
const operationBtnsOneOperator =
  document.querySelectorAll(".btn-operation-one");
const addMemoryBtn = document.querySelector(".btn-memory-add");
const subMemoryBtn = document.querySelector(".btn-memory-sub");
const readMemoryBtn = document.querySelector(".btn-memory-read");
const cleanMemoryBtn = document.querySelector(".btn-memory-clear");

const calculator = new Calculator(currentOperandEl);
calculator.clear();

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.addNumber(button.innerText);
    calculator.updateUi();
  });
});

operationBtnsOneOperator.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.getOperationOneOperator(button.innerHTML);
    calculator.updateUi();
  });
});

operationBtnsTwoOperators.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.operationValidation(button.innerHTML);
    // calculator.getOperationTwoOperators(button.innerHTML);
    calculator.updateUi();
  });
});

equalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.equal();
  calculator.updateUi();
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

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateUi();
});
