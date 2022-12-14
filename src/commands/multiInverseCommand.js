class MultiInverseCommand {
  constructor(curr) {
    this.curr = curr;
  }

  execute() {
    return 1 / this.curr;
  }

  undo() {
    return 10 / (this.curr * 10);
  }
}

export default MultiInverseCommand;
