/** @jest-environment jsdom */
import PercentCommand from "../commands/percentCommand";
import Calculator from "../index";

describe("Percent Command", () => {
  test("10 percent to equal 0.1", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new PercentCommand(10));
    expect(calculator.currentOperand).toBe(0.1);
  });
  test("100 percent to equal 1", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new PercentCommand(100));
    expect(calculator.currentOperand).toBe(1);
  });
});
