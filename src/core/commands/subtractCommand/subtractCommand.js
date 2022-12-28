import AbstractCommand from "../abstractCommand";

class SubtractCommand extends AbstractCommand {
  constructor(prevToAdd, currToAdd) {
    super();
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
