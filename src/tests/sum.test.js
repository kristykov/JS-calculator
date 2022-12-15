/** @jest-environment jsdom */
import AddCommand from "../commands/addCommand";
import Calculator from "../index";

describe("Add Command", () => {
  test("adds 1 + 2 to equal 3", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new AddCommand(1, 2));
    expect(calculator.currentOperand).toBe(3);
  });
  test("adds 0.1 + 0.2 to equal 0.3", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new AddCommand(0.1, 0.2));
    expect(calculator.currentOperand).toBe(0.3);
  });
});
