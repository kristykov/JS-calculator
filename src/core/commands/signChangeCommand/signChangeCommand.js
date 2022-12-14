import AbstractCommand from "../abstractCommand";

class SignChangeCommand extends AbstractCommand {
  constructor(curr) {
    super();
    this.curr = curr;
  }

  execute() {
    return this.curr > 0 ? -this.curr : Math.abs(this.curr);
  }

  undo() {
    return this.curr > 0 ? -this.curr : Math.abs(this.curr);
  }
}

export default SignChangeCommand;
