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
    // if (this.currentOperand === 0) {
    //   this.currentOperand = num;
    //   return;
    // }
    // this.currentOperand = this.currentOperand.toString() + num.toString();
    // if (this.leftOperand !== 0) {
    //   this.rightOperand = this.currentOperand;
    //   console.log("works");
    // }
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

  getOperationTwoOperators(operation) {
    console.log("operation:", operation);
    // this.currentOperand += operation;
    if (this.leftOperand === "" && this.rightOperand === "") {
      this.leftOperand = this.currentOperand;
      this.currentOperand += operation;
      //   console.log("left assigned");
    } else if (this.leftOperand !== "" && this.rightOperand === "") {
      console.log("Curr:", this.currentOperand);
      this.rightOperand = this.currentOperand.slice(
        this.leftOperand.length + 1,
      );
      //   console.log(this.rightOperand);
      this.compute();
      this.currentOperand += operation;
    }
    this.operation = operation;

    // this.currentOperand += operation;
    this.updateUi();

    // if (this.leftOperand !== "") {
    //   this.rightOperand = this.currentOperand;
    // }
    // this.compute();
  }

  compute() {
    let res;
    const prev = parseFloat(this.leftOperand);
    const curr = parseFloat(this.rightOperand);
    console.log("left", this.leftOperand);
    console.log("right", this.rightOperand);
    console.log("operation", this.operation);

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
        console.log("works");
        res = prev ** curr;
        break;
      case '<sup class="superscript-root"/>y</sup><span>√</span><span>x</span>':
        console.log("works");

        res = prev / curr;
        break;
      default:
        return;
    }
    this.currentOperand = res;
    this.leftOperand = res;
    this.rightOperand = "";
    // console.log("left", this.leftOperand);
    // console.log("right", this.rightOperand);
    // console.log("operation", this.operation);
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

const calculator = new Calculator(currentOperandEl);
calculator.clear();

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.addNumber(button.innerText);
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

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateUi();
});
