import AbstractCommand from "../abstractCommand";

class CubeRootCommand extends AbstractCommand {
  constructor(curr) {
    super();
    this.curr = curr;
  }

  execute() {
    return Math.cbrt(this.curr);
  }

  undo() {
    return this.curr ** (1 / 3);
  }
}

export default CubeRootCommand;
