import "./style.scss";
import AddCommand from "./commands/addCommand";
import SubtractCommand from "./commands/subtractCommand";
import MultiplyCommand from "./commands/multiplyCommand";
import DivideCommand from "./commands/devideCommand";
import PowerCommand from "./commands/powerCommand";
import TakeRootCommand from "./commands/takeRootCommand";
import PowerThreeCommand from "./commands/powerThreeCommand";
import PowerTwoCommand from "./commands/powerTwoCommand";
import PercentCommand from "./commands/percentCommand";
import SignChangeCommand from "./commands/signChangeCommand";
import FactorialCommand from "./commands/factorialCommand";
import SquareRootCommand from "./commands/squareRootCommand";
import CubeRootCommand from "./commands/cubeRootCommand";
import MultiInverseCommand from "./commands/multiInverseCommand";
import PowerTenCommand from "./commands/powerTenCommand";

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
  rightOperand = "";

  leftOperand = "";

  constructor(currentOperandEl) {
    this.currentOperandEl = currentOperandEl;
    this.currentOperand = "";
    this.history = [];
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

  executeCommand(command) {
    this.history.push(this.currentOperand);
    this.currentOperand = parseFloat(command.execute().toPrecision(12));
  }

  addNumber(num) {
    if (
      num === "." &&
      (this.currentOperand.toString()[
        this.currentOperand.toString().length - 1
      ] === "." ||
        this.currentOperand.toString()[
          this.currentOperand.toString().length - 2
        ] === ".")
    ) {
      return;
    }

    if (this.currentOperand === "") {
      this.currentOperand = num;
      return;
    }
    if (this.currentOperand.toString().includes("√")) {
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
    const curr = parseFloat(this.currentOperand);
    if (Number.isNaN(curr)) {
      return;
    }
    switch (operation.trim()) {
      case "x<sup>3</sup>":
        this.executeCommand(new PowerThreeCommand(curr));
        break;
      case "x<sup>2</sup>":
        this.executeCommand(new PowerTwoCommand(curr));
        break;
      case "%":
        this.executeCommand(new PercentCommand(curr));
        break;
      case "<sup>+</sup>/-":
        this.executeCommand(new SignChangeCommand(curr));
        break;
      case "x!":
        this.executeCommand(new FactorialCommand(curr));
        break;
      case '<sup class="superscript-root">2</sup><span>√</span><span>x</span>':
        this.executeCommand(new SquareRootCommand(curr));
        break;
      case '<sup class="superscript-root">3</sup><span>√</span><span>x</span>':
        this.executeCommand(new CubeRootCommand(curr));
        break;
      case "<sup>1</sup>/<span>x</span>":
        this.executeCommand(new MultiInverseCommand(curr));
        break;
      case "10<sup>x</sup>":
        this.executeCommand(new PowerTenCommand(curr));
        break;
      default:
        return;
    }
    if (this.currentOperand === Infinity) {
      this.currentOperand = "Error";
    } else if (
      this.currentOperand.toString().length > 5 ||
      this.currentOperand % 1 !== 0
    ) {
      this.currentOperand = this.currentOperand.toFixed(7);
    }
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

    if (prev === "" || curr === "") {
      return;
    }

    switch (this.operation) {
      case "+":
        this.executeCommand(new AddCommand(prev, curr));
        break;
      case "-":
        this.executeCommand(new SubtractCommand(prev, curr));
        break;
      case "*":
        this.executeCommand(new MultiplyCommand(prev, curr));
        break;
      case "/":
        if (curr !== 0) {
          this.executeCommand(new DivideCommand(prev, curr));
        } else {
          this.currentOperand = "Error";
        }
        break;
      case "^":
        this.executeCommand(new PowerCommand(prev, curr));
        break;
      case "√":
        this.executeCommand(new TakeRootCommand(prev, curr));
        break;
      default:
        return;
    }
    this.leftOperand = this.currentOperand;
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

  deletePrevSymbol() {
    if (this.currentOperand) {
      this.currentOperand = this.currentOperand.slice(0, -1);
      this.updateUi();
    }
  }

  cleanMemory() {
    localStorage.removeItem("memoryItem");
    this.currentOperand = "";
  }

  updateUi() {
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
const backSpaceBtn = document.querySelector(".btn-backspace");

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

backSpaceBtn.addEventListener("click", () => {
  calculator.deletePrevSymbol();
});

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateUi();
});
