class CubeRootCommand {
  constructor(curr) {
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
