/** @jest-environment jsdom */
import SignChangeCommand from "../commands/signChangeCommand";
import Calculator from "../index";

describe("Sign Change Command", () => {
  test("-10 to equal 10", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new SignChangeCommand(-10));
    expect(calculator.currentOperand).toBe(10);
  });
  test("10 to equal -10", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new SignChangeCommand(10));
    expect(calculator.currentOperand).toBe(-10);
  });
});
