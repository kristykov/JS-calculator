/** @jest-environment jsdom */
import PowerCommand from "../commands/powerCommand";
import Calculator from "../index";

describe("Power Command", () => {
  test("2^3 to equal 8", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new PowerCommand(2, 3));
    expect(calculator.currentOperand).toBe(8);
  });
  test("10^2 to equal 100", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new PowerCommand(10, 2));
    expect(calculator.currentOperand).toBe(100);
  });
});
