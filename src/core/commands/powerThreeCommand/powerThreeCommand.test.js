/** @jest-environment jsdom */
import PowerThreeCommand from "./powerThreeCommand";
import Calculator from "../../calc";

describe("Power Three Command", () => {
  test("3 power 3 to equal 27", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new PowerThreeCommand(3));
    expect(calculator.currentOperand).toBe(27);
  });
  test("13 power 3 to equal 2197", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new PowerThreeCommand(13));
    expect(calculator.currentOperand).toBe(2197);
  });
});
