/** @jest-environment jsdom */
import MultiInverseCommand from "./multiInverseCommand";
import Calculator from "../../calc";

describe("MultiInverse Command", () => {
  test("5 to equal 0.2", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new MultiInverseCommand(5));
    expect(calculator.currentOperand).toBe(0.2);
  });
  test("16 to equal 0.0625", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new MultiInverseCommand(16));
    expect(calculator.currentOperand).toBe(0.0625);
  });
});
