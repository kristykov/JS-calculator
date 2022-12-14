class PowerThreeCommand {
  constructor(curr) {
    this.curr = curr;
  }

  execute() {
    return this.curr ** 3;
  }

  undo() {
    return this.curr ** (1 / 3);
  }
}

export default PowerThreeCommand;
