/** @jest-environment jsdom */
import DivideCommand from "../commands/divideCommand";
import Calculator from "../index";

describe("Divide Command", () => {
  test("divide 4 by 2 to equal 2", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new DivideCommand(4, 2));
    expect(calculator.currentOperand).toBe(2);
  });
  test("divide 0.3 by 0.1 to equal 3", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new DivideCommand(0.3, 0.1));
    expect(calculator.currentOperand).toBe(3);
  });
});
