import AbstractCommand from "../abstractCommand";

class SquareRootCommand extends AbstractCommand {
  constructor(curr) {
    super();
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
