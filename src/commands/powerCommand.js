class PowerCommand {
  constructor(prevToAdd, currToAdd) {
    this.prevToAdd = prevToAdd;
    this.currToAdd = currToAdd;
  }

  execute() {
    return this.prevToAdd ** this.currToAdd;
  }

  undo() {
    return this.currToAdd ** (1 / this.prevToAdd);
  }
}

export default PowerCommand;
