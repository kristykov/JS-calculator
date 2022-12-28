/** @jest-environment jsdom */
import TakeRootCommand from "./takeRootCommand";
import Calculator from "../../../index";

describe("Take Root Command", () => {
  test("3 root of 343 to equal 7", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new TakeRootCommand(3, 343));
    expect(calculator.currentOperand).toBe(7);
  });
  test("5 root of 243 to equal 3", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new TakeRootCommand(5, 243));
    expect(calculator.currentOperand).toBe(3);
  });
});
