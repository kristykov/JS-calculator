class PercentCommand {
  constructor(curr) {
    this.curr = curr;
  }

  execute() {
    return this.curr / 100;
  }

  undo() {
    return this.curr * 100;
  }
}

export default PercentCommand;
