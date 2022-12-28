import AbstractCommand from "../abstractCommand";

class PowerTwoCommand extends AbstractCommand {
  constructor(curr) {
    super();
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
