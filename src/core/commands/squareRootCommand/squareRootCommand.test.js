/** @jest-environment jsdom */
import SquareRootCommand from "./squareRootCommand";
import Calculator from "../../calc";

describe("Square Root Command", () => {
  test("4 to equal 2", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new SquareRootCommand(4));
    expect(calculator.currentOperand).toBe(2);
  });
  test("16 to equal 4", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new SquareRootCommand(16));
    expect(calculator.currentOperand).toBe(4);
  });
});
