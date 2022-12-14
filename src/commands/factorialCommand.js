class FactorialCommand {
  constructor(curr) {
    this.curr = curr;
  }

  execute(curr = this.curr) {
    this.curr = curr;
    if (this.curr.toString().length > 4) {
      return Infinity;
    }
    if (this.curr < 0) return -1;
    if (this.curr === 0) return 1;

    return this.curr * this.execute(this.curr - 1);
  }

  undo() {
    let product = 1;
    const n = 1;

    while (product <= this.curr) {
      if (product === this.curr) return `${n}!`;
      product *= n + 1;
    }
    return "Error";
  }
}

export default FactorialCommand;
