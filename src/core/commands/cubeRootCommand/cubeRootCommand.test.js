/** @jest-environment jsdom */
import CubeRootCommand from "./cubeRootCommand";
import Calculator from "../../calc";

describe("Cube Root Command", () => {
  test("64 to equal 4", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new CubeRootCommand(64));
    expect(calculator.currentOperand).toBe(4);
  });
  test("729 to equal 9", () => {
    const calculator = new Calculator();
    calculator.executeCommand(new CubeRootCommand(729));
    expect(calculator.currentOperand).toBe(9);
  });
});
