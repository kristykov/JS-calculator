/** @jest-environment jsdom */
import PowerTenCommand from "../commands/powerTenCommand";
import Calculator from "../index";

describe("Power Ten Command", () => {
  test("10 power 10 to equal 10000000000", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new PowerTenCommand(10));
    expect(calculator.currentOperand).toBe(10000000000);
  });
  test("10 power 2 to equal 100", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new PowerTenCommand(2));
    expect(calculator.currentOperand).toBe(100);
  });
});
