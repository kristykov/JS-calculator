import AbstractCommand from "../abstractCommand";

class PercentCommand extends AbstractCommand {
  constructor(curr) {
    super();
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
