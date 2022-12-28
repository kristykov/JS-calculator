import AbstractCommand from "../abstractCommand";

class TakeRootCommand extends AbstractCommand {
  constructor(prevToAdd, currToAdd) {
    super();
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
