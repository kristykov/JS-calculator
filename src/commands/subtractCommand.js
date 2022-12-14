class SubtractCommand {
  constructor(prevToAdd, currToAdd) {
    this.prevToAdd = prevToAdd;
    this.currToAdd = currToAdd;
  }

  execute() {
    return this.prevToAdd - this.currToAdd;
  }

  undo() {
    return this.prevToAdd + this.currToAdd;
  }
}

export default SubtractCommand;
