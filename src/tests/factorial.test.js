/** @jest-environment jsdom */
import FactorialCommand from "../commands/factorialCommand";
import Calculator from "../index";

describe("Factorial Command", () => {
  test("5 to equal 120", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new FactorialCommand(5));
    expect(calculator.currentOperand).toBe(120);
  });
  test("8 to equal 40320", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new FactorialCommand(8));
    expect(calculator.currentOperand).toBe(40320);
  });
});
