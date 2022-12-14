class SquareRootCommand {
  constructor(curr) {
    this.curr = curr;
  }

  execute() {
    return Math.sqrt(this.curr);
  }

  undo() {
    return this.curr ** (1 / 2);
  }
}

export default SquareRootCommand;
