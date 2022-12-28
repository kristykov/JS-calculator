/** @jest-environment jsdom */
import PowerTwoCommand from "./powerTwoCommand";
import Calculator from "../../calc";

describe("Power Two Command", () => {
  test("14 power 2 to equal 196", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new PowerTwoCommand(14));
    expect(calculator.currentOperand).toBe(196);
  });
  test("58 power 2 to equal 3364", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new PowerTwoCommand(58));
    expect(calculator.currentOperand).toBe(3364);
  });
});
