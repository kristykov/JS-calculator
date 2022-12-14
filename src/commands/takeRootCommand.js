class TakeRootCommand {
  constructor(prevToAdd, currToAdd) {
    this.prevToAdd = prevToAdd;
    this.currToAdd = currToAdd;
  }

  execute() {
    return this.currToAdd ** (1 / this.prevToAdd);
  }

  undo() {
    return this.prevToAdd ** this.currToAdd;
  }
}

export default TakeRootCommand;
