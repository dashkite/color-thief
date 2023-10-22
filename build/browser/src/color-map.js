var ColorMap, compare;
import * as Type from "@dashkite/joy/type";
import * as C from "./constants.js";
import * as pv from "./pv.js";
import { Queue } from "./queue.js";
import { getColorIndex } from "./histogram.js";
compare = function (a, b) {
  return pv.naturalOrder(a.vbox.count() * a.vbox.volume(), b.vbox.count() * b.vbox.volume());
};
ColorMap = class ColorMap {
  constructor() {
    this.vboxes = Queue.create({
      compare
    });
  }
  static create() {
    return new ColorMap();
  }
  push(vbox) {
    var color;
    color = vbox.avg();
    return this.vboxes.push({
      vbox,
      color
    });
  }
  palette() {
    return this.vboxes.map(function (vbox) {
      return vbox.color;
    });
  }
  size() {
    return this.vboxes.size();
  }
  map(color) {
    var i, j, ref, value;
    for (i = j = 0, ref = this.vboxes.size; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      value = this.vboxes.peek(i);
      if (value.vbox.contains(color)) {
        return value.color;
      }
    }
    return this.nearest(color);
  }
  nearest(color) {
    var current, distance, i, j, nearest, ref, result;
    result = null;
    nearest = 1e12;
    for (i = j = 0, ref = this.vboxes.size; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      current = this.vboxes.peek(i).color;
      distance = Math.sqrt(Math.pow(color[0] - current[0], 2) + Math.pow(color[1] - current[1], 2) + Math.pow(color[2] - current[2], 2));
      if (distance < nearest) {
        nearest = distance;
        result = current;
      }
    }
    return result;
  }
};
export { ColorMap };