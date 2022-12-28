/** @jest-environment jsdom */
import SubtractCommand from "./subtractCommand";
import Calculator from "../../calc";

describe("Subtract Command", () => {
  test("differential between 4 and 2 to equal 2", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new SubtractCommand(4, 2));
    expect(calculator.currentOperand).toBe(2);
  });
  test("differential between 0.3 and 0.1 to equal 0.2", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new SubtractCommand(0.3, 0.1));
    expect(calculator.currentOperand).toBe(0.2);
  });
});
