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

    this.currentOperand += num.toString();
  }

  operationValidation(operation) {
    let validatedOperation;
    if (operation.includes("<sup>y")) {
      validatedOperation = "^";
    } else if (operation.includes("<span>√")) {
      validatedOperation = "root";
    } else {
      validatedOperation = operation;
    }
    this.getOperationTwoOperators(validatedOperation);
  }

  getOperationOneOperator(operation) {
    let res;
    const curr = parseFloat(this.currentOperand);
    console.log(operation.trim());
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
        res = factorial(curr);
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
    if (res.toString().length > 5) {
      res = res.toFixed(5);
    }
    this.currentOperand = res;
  }

  getOperationTwoOperators(operation) {
    if (!this.currentOperand) {
      return;
    }
    if (this.leftOperand === "" && this.rightOperand === "") {
      this.leftOperand = this.currentOperand;
      this.currentOperand += operation;
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
    if (this.rightOperand === "") {
      this.rightOperand = this.currentOperand.slice(
        this.leftOperand.toString().length + 1,
      );
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
      case '<sup class="superscript-root"/>y</sup><span>√</span><span>x</span>':
        res = prev / curr;
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

  updateUi() {
    if (this.currentOperand !== 0) {
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
    calculator.getOperationTwoOperators(button.innerHTML);
    calculator.updateUi();
  });
});

equalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.equal();
  calculator.updateUi();
});

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateUi();
});
