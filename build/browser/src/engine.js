var Engine;
import * as C from "./constants.js";
import { applyMedianCut } from "./cut.js";
Engine = class Engine {
  constructor({
    queue: queue1,
    histogram: histogram1
  }) {
    this.queue = queue1;
    this.histogram = histogram1;
  }
  static create({
    queue,
    histogram
  }) {
    return new Engine({
      queue,
      histogram
    });
  }
  run(target) {
    var colorCount, iterations, vbox, vbox1, vbox2;
    iterations = 0;
    colorCount = 1;
    while (iterations < C.maxIterations) {
      vbox = this.queue.pop();
      if (!vbox.count()) {
        this.queue.push(vbox);
        iterations++;
        continue;
      }
      // Split the space
      [vbox1, vbox2] = applyMedianCut(this.histogram, vbox);
      this.queue.push(vbox1);
      if (vbox2 != null) {
        this.queue.push(vbox2);
        colorCount++;
      }
      // Stop conditions
      if (colorCount >= target) {
        return;
      }
      if (iterations >= C.maxIterations) {
        // Can happen if there are too few pixels
        return;
      }
    }
  }
};
export { Engine };