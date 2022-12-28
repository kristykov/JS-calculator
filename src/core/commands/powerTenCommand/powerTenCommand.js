import AbstractCommand from "../abstractCommand";

class PowerTenCommand extends AbstractCommand {
  constructor(curr) {
    super();
    this.curr = curr;
  }

  execute() {
    return 10 ** this.curr;
  }

  undo() {
    return Math.log10(this.curr);
  }
}

export default PowerTenCommand;
