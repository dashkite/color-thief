"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Engine = void 0;
var C = _interopRequireWildcard(require("./constants.js"));
var _cut = require("./cut.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var Engine;
exports.Engine = Engine = class Engine {
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
      [vbox1, vbox2] = (0, _cut.applyMedianCut)(this.histogram, vbox);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9lbmdpbmUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBLE1BQUE7QUFJTSxPQUFBLENBQUEsTUFBQSxHQUFBLE1BQUEsR0FBTixNQUFBLE1BQUEsQ0FBQTtFQUNFLFdBQWEsQ0FBQztJQUFHLEtBQUEsRUFBQSxNQUFIO0lBQVcsU0FBQSxFQUFBO0VBQVgsQ0FBRCxFQUFBO0lBQUcsSUFBQyxDQUFBLEtBQUEsR0FBQSxNQUFBO0lBQU8sSUFBQyxDQUFBLFNBQUEsR0FBQSxVQUFBO0VBQVo7RUFFSixPQUFSLE1BQVEsQ0FBQztJQUFFLEtBQUY7SUFBUztFQUFULENBQUQsRUFBQTtXQUNQLElBQUksTUFBSixDQUFXO01BQUUsS0FBRjtNQUFTO0lBQVQsQ0FBWCxDQUFBO0VBRE87RUFHVCxHQUFLLENBQUUsTUFBRixFQUFBO0lBQ1AsSUFBQSxVQUFBLEVBQUEsVUFBQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQTtJQUFJLFVBQUEsR0FBYSxDQUFBO0lBQ2IsVUFBQSxHQUFhLENBQUE7SUFFYixPQUFNLFVBQUEsR0FBYSxDQUFDLENBQUMsYUFBckIsRUFBQTtNQUNFLElBQUEsR0FBTyxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBQSxDQUFBO01BR1AsSUFBRyxDQUFDLElBQUksQ0FBQyxLQUFMLENBQUEsQ0FBSixFQUFBO1FBQ0UsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQVksSUFBWixDQUFBO1FBQ0EsVUFBQSxFQUFBO1FBRkY7TUFITjs7TUFTTSxDQUFFLEtBQUYsRUFBUyxLQUFULENBQUEsR0FBbUIsSUFBQSxtQkFBQSxFQUFlLElBQUMsQ0FBQSxTQUFoQixFQUEyQixJQUEzQixDQUFBO01BQ25CLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFZLEtBQVosQ0FBQTtNQUNBLElBQUcsS0FBQSxJQUFBLElBQUgsRUFBQTtRQUNFLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFZLEtBQVosQ0FBQTtRQUNBLFVBQUEsRUFGRjtNQVhOOztNQWdCTSxJQUFHLFVBQUEsSUFBYyxNQUFqQixFQUFBO1FBQUE7O01BRUEsSUFBRyxVQUFBLElBQWMsQ0FBQyxDQUFDLGFBQW5CLEVBQUE7UUFBQTtRQUFBOztJQW5CRjtFQUpHO0FBTlAsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEMgZnJvbSBcIi4vY29uc3RhbnRzXCJcbmltcG9ydCB7IGFwcGx5TWVkaWFuQ3V0IH0gZnJvbSBcIi4vY3V0XCJcblxuXG5jbGFzcyBFbmdpbmVcbiAgY29uc3RydWN0b3I6ICh7IEBxdWV1ZSwgQGhpc3RvZ3JhbSB9KSAtPlxuXG4gIEBjcmVhdGU6ICh7IHF1ZXVlLCBoaXN0b2dyYW0gfSkgLT5cbiAgICBuZXcgRW5naW5lIHsgcXVldWUsIGhpc3RvZ3JhbSB9XG5cbiAgcnVuOiAoIHRhcmdldCApIC0+XG4gICAgaXRlcmF0aW9ucyA9IDBcbiAgICBjb2xvckNvdW50ID0gMVxuXG4gICAgd2hpbGUgaXRlcmF0aW9ucyA8IEMubWF4SXRlcmF0aW9uc1xuICAgICAgdmJveCA9IEBxdWV1ZS5wb3AoKVxuICAgICAgXG4gICAgICAjIEp1c3QgcHV0IGl0IGJhY2tcbiAgICAgIGlmICF2Ym94LmNvdW50KClcbiAgICAgICAgQHF1ZXVlLnB1c2ggdmJveFxuICAgICAgICBpdGVyYXRpb25zKytcbiAgICAgICAgY29udGludWVcblxuICAgICAgIyBTcGxpdCB0aGUgc3BhY2VcbiAgICAgIFsgdmJveDEsIHZib3gyIF0gPSBhcHBseU1lZGlhbkN1dCBAaGlzdG9ncmFtLCB2Ym94XG4gICAgICBAcXVldWUucHVzaCB2Ym94MVxuICAgICAgaWYgdmJveDI/XG4gICAgICAgIEBxdWV1ZS5wdXNoIHZib3gyXG4gICAgICAgIGNvbG9yQ291bnQrK1xuXG4gICAgICAjIFN0b3AgY29uZGl0aW9uc1xuICAgICAgaWYgY29sb3JDb3VudCA+PSB0YXJnZXRcbiAgICAgICAgcmV0dXJuXG4gICAgICBpZiBpdGVyYXRpb25zID49IEMubWF4SXRlcmF0aW9uc1xuICAgICAgICByZXR1cm4gIyBDYW4gaGFwcGVuIGlmIHRoZXJlIGFyZSB0b28gZmV3IHBpeGVsc1xuXG5cblxuZXhwb3J0IHsgRW5naW5lIH0iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=src/engine.coffee