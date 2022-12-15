/** @jest-environment jsdom */
import MultiplyCommand from "../commands/multiplyCommand";
import Calculator from "../index";

describe("Multiply Command", () => {
  test("multiplication 4 by 2 to equal 8", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new MultiplyCommand(4, 2));
    expect(calculator.currentOperand).toBe(8);
  });
  test("multiplication 0.3 by 0.1 to equal 0.03", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new MultiplyCommand(0.3, 0.1));
    expect(calculator.currentOperand).toBe(0.03);
  });
});
