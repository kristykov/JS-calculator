class PowerTwoCommand {
  constructor(curr) {
    this.curr = curr;
  }

  execute() {
    return this.curr ** 2;
  }

  undo() {
    return this.curr ** (1 / 2);
  }
}

export default PowerTwoCommand;
