import AddCommand from "./commands/addCommand/addCommand";
import SubtractCommand from "./commands/subtractCommand/subtractCommand";
import MultiplyCommand from "./commands/multiplyCommand/multiplyCommand";
import DivideCommand from "./commands/divideCommand/divideCommand";
import PowerCommand from "./commands/powerCommand/powerCommand";
import TakeRootCommand from "./commands/takeRootCommand/takeRootCommand";
import PowerThreeCommand from "./commands/powerThreeCommand/powerThreeCommand";
import PowerTwoCommand from "./commands/powerTwoCommand/powerTwoCommand";
import PercentCommand from "./commands/percentCommand/percentCommand";
import SignChangeCommand from "./commands/signChangeCommand/signChangeCommand";
import FactorialCommand from "./commands/factorialCommand/factorialCommand";
import SquareRootCommand from "./commands/squareRootCommand/squareRootCommand";
import CubeRootCommand from "./commands/cubeRootCommand/cubeRootCommand";
import MultiInverseCommand from "./commands/multiInverseCommand/multiInverseCommand";
import PowerTenCommand from "./commands/powerTenCommand/powerTenCommand";
import { MAX_LENGTH_OF_CALC_DISPLAY, BIG_FONT_MAX_LENGTH } from "./constants";

class Calculator {
  rightOperand = "";

  leftOperand = "";

  constructor(currentOperandEl) {
    this.currentOperandEl = currentOperandEl;
    this.currentOperand = "";
    this.history = [];
  }

  #executeCommand(command) {
    this.history.push(this.currentOperand);
    this.currentOperand = parseFloat(command.execute().toPrecision(12));
  }

  setCurrentOperand(num) {
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
    if (this.currentOperand.length > MAX_LENGTH_OF_CALC_DISPLAY) {
      this.currentOperand = this.currentOperand.slice(0, 16);
    }
  }

  chooseOperationWithOneOperand(operation) {
    const curr = parseFloat(this.currentOperand);
    if (Number.isNaN(curr)) {
      return;
    }
    switch (operation) {
      case "third-power":
        this.#executeCommand(new PowerThreeCommand(curr));
        break;
      case "second-power":
        this.#executeCommand(new PowerTwoCommand(curr));
        break;
      case "percent":
        this.#executeCommand(new PercentCommand(curr));
        break;
      case "change-sign":
        this.#executeCommand(new SignChangeCommand(curr));
        break;
      case "factorial":
        this.#executeCommand(new FactorialCommand(curr));
        break;
      case "square-root":
        this.#executeCommand(new SquareRootCommand(curr));
        break;
      case "cubic-root":
        this.#executeCommand(new CubeRootCommand(curr));
        break;
      case "multi-inverse":
        this.#executeCommand(new MultiInverseCommand(curr));
        break;
      case "ten-power-x":
        this.#executeCommand(new PowerTenCommand(curr));
        break;
      default:
        return;
    }
    if (this.currentOperand === Infinity) {
      this.currentOperand = "Error";
    } else if (
      this.currentOperand.toString().length > 5 &&
      this.currentOperand % 1 !== 0
    ) {
      this.currentOperand = this.currentOperand.toFixed(7);
    }
  }

  setOperandsForOperation(operation, sign) {
    if (!this.currentOperand && !this.leftOperand) {
      return;
    }
    if (this.leftOperand && !this.currentOperand) {
      this.currentOperand = this.leftOperand;
      this.leftOperand = "";
    }
    if (this.leftOperand === "" && this.rightOperand === "") {
      this.leftOperand = this.currentOperand;
      this.#setSign(sign);
    } else if (this.leftOperand !== "" && this.rightOperand === "") {
      this.rightOperand = this.currentOperand.slice(
        this.leftOperand.toString().length + 1,
      );
      if (!this.rightOperand) {
        return;
      }
      this.compute();

      this.#setSign(sign);
    }
    this.operation = operation;
    this.renderUi();
  }

  #setSign(sign) {
    if (sign === "xy") {
      this.currentOperand += "^";
    } else if (sign === "y√x") {
      this.currentOperand = `√${this.currentOperand.toString()}`;
    } else {
      this.currentOperand += sign;
    }
  }

  compute() {
    if (this.currentOperand.includes("√")) {
      this.rightOperand = this.leftOperand;
      this.leftOperand = this.currentOperand.slice(
        0,
        this.rightOperand.toString().length,
      );
    }
    if (this.rightOperand === "") {
      this.rightOperand = this.currentOperand
        .toString()
        .slice(this.leftOperand.toString().length + 1);
    }
    const prev = parseFloat(this.leftOperand);
    const curr = parseFloat(this.rightOperand);

    if (prev === "" || curr === "") {
      return;
    }

    if (Number.isNaN(curr) || Number.isNaN(prev)) {
      return;
    }

    switch (this.operation) {
      case "plus":
        this.#executeCommand(new AddCommand(prev, curr));
        break;
      case "subtract":
        this.#executeCommand(new SubtractCommand(prev, curr));
        break;
      case "mult":
        this.#executeCommand(new MultiplyCommand(prev, curr));
        break;
      case "division":
        if (curr !== 0) {
          this.#executeCommand(new DivideCommand(prev, curr));
        } else {
          this.currentOperand = "Error";
        }
        break;
      case "power-y":
        this.#executeCommand(new PowerCommand(prev, curr));
        break;
      case "y-root":
        this.#executeCommand(new TakeRootCommand(prev, curr));
        break;
      default:
        return;
    }
    this.leftOperand = this.currentOperand;
    this.rightOperand = "";
    this.renderUi();
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
    this.renderUi();
    this.currentOperand = "";
  }

  deletePrevSymbol() {
    if (this.currentOperand) {
      this.currentOperand = this.currentOperand.slice(0, -1);
      this.renderUi();
    }
  }

  cleanMemory() {
    localStorage.removeItem("memoryItem");
    this.currentOperand = "";
  }

  renderUi() {
    if (this.currentOperand === undefined) {
      this.currentOperand = "Error";
    }
    if (this.currentOperand.toString().length > BIG_FONT_MAX_LENGTH) {
      this.currentOperandEl.classList.add("medium-font");
    }
    if (this.currentOperand !== "" || this.currentOperand !== "Error") {
      this.currentOperandEl.innerText = this.currentOperand;
    }
  }

  clearCurrentOperand() {
    this.currentOperand = "";
  }

  clear() {
    this.currentOperand = "";
    this.leftOperand = "";
    this.operation = undefined;
    if (this.currentOperandEl.classList.contains("medium-font")) {
      this.currentOperandEl.classList.remove("medium-font");
    }
    this.renderUi();
  }
}

export default Calculator;
