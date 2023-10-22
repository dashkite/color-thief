"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quantize = void 0;
var C = _interopRequireWildcard(require("./constants.js"));
var pv = _interopRequireWildcard(require("./pv.js"));
var _queue = require("./queue.js");
var _vbox = require("./vbox.js");
var _colorMap = require("./color-map.js");
var _histogram = require("./histogram.js");
var _engine = require("./engine.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var compareOccupancy, comparePopulation, quantize;
comparePopulation = function (a, b) {
  return pv.naturalOrder(a.count(), b.count());
};
compareOccupancy = function (a, b) {
  return pv.naturalOrder(a.count() * a.volume(), b.count() * b.volume());
};
exports.quantize = quantize = function (pixels, maxColors) {
  var colorMap, engine, histogram, histogramSize, queue1, queue2, vbox;
  histogram = (0, _histogram.getHistogram)(pixels);
  histogramSize = 1 << 3 * C.sigbits;
  // get the starting vbox from the colors
  vbox = _vbox.VBox.fromPixels(pixels, histogram);
  queue1 = _queue.Queue.create({
    compare: comparePopulation
  });
  queue1.push(vbox);

  // first set of colors, sorted by population
  engine = _engine.Engine.create({
    queue: queue1,
    histogram
  });
  engine.run(C.populationFraction * maxColors);
  // re-sort by the product of pixel occupancy times the size in color space.
  queue2 = _queue.Queue.create({
    compare: compareOccupancy
  });
  while (queue1.size > 0) {
    queue2.push(queue1.pop());
  }

  // next set - generate the median cuts using the (npix * vol) sorting.
  engine.queue = queue2;
  engine.run(maxColors - queue2.size);
  // calculate the actual colors
  colorMap = _colorMap.ColorMap.create();
  while (queue2.size > 0) {
    colorMap.push(queue2.pop());
  }
  return colorMap;
};

// {
//     "r1": 28,
//     "r2": 29,
//     "g1": 11,
//     "g2": 12,
//     "b1": 0,
//     "b2": 3,
//     "count": 3,
//     "volume": 16,
//     "avg": [
//         228,
//         100,
//         14
//     ]
// }

// {
//     "r1": 28,
//     "r2": 29,
//     "g1": 11,
//     "g2": 12,
//     "b1": 0,
//     "b2": 3,
//     "count": 3,
//     "volume": 16,
//     "avg": [
//         228,
//         100,
//         14
//     ]
// }

// {
//     "r1": 8,
//     "r2": 7,
//     "g1": 5,
//     "g2": 5,
//     "b1": 0,
//     "b2": 0,
//     "count": 190895,
//     "volume": 0,
//     "avg": [
//         61,
//         44,
//         4
//     ]
// }

// {
//     "r1": 8,
//     "r2": 7,
//     "g1": 5,
//     "g2": 5,
//     "b1": 0,
//     "b2": 0,
//     "count": 0,
//     "volume": 0,
//     "avg": [
//         64,
//         44,
//         4
//     ]
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9xdWFudGl6ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQSxnQkFBQSxFQUFBLGlCQUFBLEVBQUEsUUFBQTtBQVNBLGlCQUFBLEdBQW9CLFNBQUEsQ0FBRSxDQUFGLEVBQUssQ0FBTCxFQUFBO1NBQ2xCLEVBQUUsQ0FBQyxZQUFILENBQWdCLENBQUMsQ0FBQyxLQUFGLENBQUEsQ0FBaEIsRUFBMkIsQ0FBQyxDQUFDLEtBQUYsQ0FBQSxDQUEzQixDQUFBO0FBRGtCLENBQUE7QUFHcEIsZ0JBQUEsR0FBbUIsU0FBQSxDQUFFLENBQUYsRUFBSyxDQUFMLEVBQUE7U0FDakIsRUFBRSxDQUFDLFlBQUgsQ0FBaUIsQ0FBQyxDQUFDLEtBQUYsQ0FBQSxDQUFBLEdBQVksQ0FBQyxDQUFDLE1BQUYsQ0FBQSxDQUE3QixFQUEyQyxDQUFDLENBQUMsS0FBRixDQUFBLENBQUEsR0FBWSxDQUFDLENBQUMsTUFBRixDQUFBLENBQXZELENBQUE7QUFEaUIsQ0FBQTtBQUluQixPQUFBLENBQUEsUUFBQSxHQUFBLFFBQUEsR0FBVyxTQUFBLENBQUUsTUFBRixFQUFVLFNBQVYsRUFBQTtFQUNYLElBQUEsUUFBQSxFQUFBLE1BQUEsRUFBQSxTQUFBLEVBQUEsYUFBQSxFQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsSUFBQTtFQUFFLFNBQUEsR0FBWSxJQUFBLHVCQUFBLEVBQWEsTUFBYixDQUFBO0VBQ1osYUFBQSxHQUFnQixDQUFBLElBQU8sQ0FBQSxHQUFJLENBQUMsQ0FBUCxPQUR2Qjs7RUFJRSxJQUFBLEdBQU8sVUFBSSxDQUFDLFVBQUwsQ0FBZ0IsTUFBaEIsRUFBd0IsU0FBeEIsQ0FBQTtFQUNQLE1BQUEsR0FBUyxZQUFLLENBQUMsTUFBTixDQUFhO0lBQUEsT0FBQSxFQUFTO0VBQVQsQ0FBYixDQUFBO0VBQ1QsTUFBTSxDQUFDLElBQVAsQ0FBWSxJQUFaLENBTkY7OztFQVNFLE1BQUEsR0FBUyxjQUFNLENBQUMsTUFBUCxDQUFjO0lBQUUsS0FBQSxFQUFPLE1BQVQ7SUFBaUI7RUFBakIsQ0FBZCxDQUFBO0VBQ1QsTUFBTSxDQUFDLEdBQVAsQ0FBVyxDQUFDLENBQUMsa0JBQUYsR0FBdUIsU0FBbEMsQ0FWRjs7RUFhRSxNQUFBLEdBQVMsWUFBSyxDQUFDLE1BQU4sQ0FBYTtJQUFBLE9BQUEsRUFBUztFQUFULENBQWIsQ0FBQTtFQUNULE9BQU0sTUFBTSxDQUFDLElBQVAsR0FBYyxDQUFwQixFQUFBO0lBQ0UsTUFBTSxDQUFDLElBQVAsQ0FBWSxNQUFNLENBQUMsR0FBUCxDQUFBLENBQVosQ0FBQTtFQWZKOzs7RUFrQkUsTUFBTSxDQUFDLEtBQVAsR0FBZSxNQUFBO0VBQ2YsTUFBTSxDQUFDLEdBQVAsQ0FBVyxTQUFBLEdBQVksTUFBTSxDQUFDLElBQTlCLENBbkJGOztFQXNCRSxRQUFBLEdBQVcsa0JBQVEsQ0FBQyxNQUFULENBQUEsQ0FBQTtFQUNYLE9BQU0sTUFBTSxDQUFDLElBQVAsR0FBYyxDQUFwQixFQUFBO0lBQ0UsUUFBUSxDQUFDLElBQVQsQ0FBYyxNQUFNLENBQUMsR0FBUCxDQUFBLENBQWQsQ0FBQTtFQURGO1NBR0EsUUFBQTtBQTNCUyxDQUFBOztBQWhCWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEMgZnJvbSBcIi4vY29uc3RhbnRzXCJcbmltcG9ydCAqIGFzIHB2IGZyb20gXCIuL3B2XCJcbmltcG9ydCB7IFF1ZXVlIH0gZnJvbSBcIi4vcXVldWVcIlxuaW1wb3J0IHsgVkJveCB9IGZyb20gXCIuL3Zib3hcIlxuaW1wb3J0IHsgQ29sb3JNYXAgfSBmcm9tIFwiLi9jb2xvci1tYXBcIlxuaW1wb3J0IHsgZ2V0SGlzdG9ncmFtIH0gZnJvbSBcIi4vaGlzdG9ncmFtXCJcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiXG5cblxuY29tcGFyZVBvcHVsYXRpb24gPSAoIGEsIGIgKSAtPiBcbiAgcHYubmF0dXJhbE9yZGVyIGEuY291bnQoKSwgYi5jb3VudCgpXG5cbmNvbXBhcmVPY2N1cGFuY3kgPSAoIGEsIGIgKSAtPlxuICBwdi5uYXR1cmFsT3JkZXIgKGEuY291bnQoKSAqIGEudm9sdW1lKCkpLCAoYi5jb3VudCgpICogYi52b2x1bWUoKSlcblxuXG5xdWFudGl6ZSA9ICggcGl4ZWxzLCBtYXhDb2xvcnMgKSAtPiAgICAgICAgXG4gIGhpc3RvZ3JhbSA9IGdldEhpc3RvZ3JhbSBwaXhlbHNcbiAgaGlzdG9ncmFtU2l6ZSA9IDEgPDwgKCAzICogQy5zaWdiaXRzIClcblxuICAjIGdldCB0aGUgc3RhcnRpbmcgdmJveCBmcm9tIHRoZSBjb2xvcnNcbiAgdmJveCA9IFZCb3guZnJvbVBpeGVscyBwaXhlbHMsIGhpc3RvZ3JhbVxuICBxdWV1ZTEgPSBRdWV1ZS5jcmVhdGUgY29tcGFyZTogY29tcGFyZVBvcHVsYXRpb25cbiAgcXVldWUxLnB1c2ggdmJveFxuICBcbiAgIyBmaXJzdCBzZXQgb2YgY29sb3JzLCBzb3J0ZWQgYnkgcG9wdWxhdGlvblxuICBlbmdpbmUgPSBFbmdpbmUuY3JlYXRlIHsgcXVldWU6IHF1ZXVlMSwgaGlzdG9ncmFtIH1cbiAgZW5naW5lLnJ1biBDLnBvcHVsYXRpb25GcmFjdGlvbiAqIG1heENvbG9yc1xuXG4gICMgcmUtc29ydCBieSB0aGUgcHJvZHVjdCBvZiBwaXhlbCBvY2N1cGFuY3kgdGltZXMgdGhlIHNpemUgaW4gY29sb3Igc3BhY2UuXG4gIHF1ZXVlMiA9IFF1ZXVlLmNyZWF0ZSBjb21wYXJlOiBjb21wYXJlT2NjdXBhbmN5XG4gIHdoaWxlIHF1ZXVlMS5zaXplID4gMFxuICAgIHF1ZXVlMi5wdXNoIHF1ZXVlMS5wb3AoKVxuICBcbiAgIyBuZXh0IHNldCAtIGdlbmVyYXRlIHRoZSBtZWRpYW4gY3V0cyB1c2luZyB0aGUgKG5waXggKiB2b2wpIHNvcnRpbmcuXG4gIGVuZ2luZS5xdWV1ZSA9IHF1ZXVlMlxuICBlbmdpbmUucnVuIG1heENvbG9ycyAtIHF1ZXVlMi5zaXplXG5cbiAgIyBjYWxjdWxhdGUgdGhlIGFjdHVhbCBjb2xvcnNcbiAgY29sb3JNYXAgPSBDb2xvck1hcC5jcmVhdGUoKVxuICB3aGlsZSBxdWV1ZTIuc2l6ZSA+IDBcbiAgICBjb2xvck1hcC5wdXNoIHF1ZXVlMi5wb3AoKSAgXG4gIFxuICBjb2xvck1hcFxuXG5leHBvcnQgeyBxdWFudGl6ZSB9XG5cblxuXG5cblxuIyB7XG4jICAgICBcInIxXCI6IDI4LFxuIyAgICAgXCJyMlwiOiAyOSxcbiMgICAgIFwiZzFcIjogMTEsXG4jICAgICBcImcyXCI6IDEyLFxuIyAgICAgXCJiMVwiOiAwLFxuIyAgICAgXCJiMlwiOiAzLFxuIyAgICAgXCJjb3VudFwiOiAzLFxuIyAgICAgXCJ2b2x1bWVcIjogMTYsXG4jICAgICBcImF2Z1wiOiBbXG4jICAgICAgICAgMjI4LFxuIyAgICAgICAgIDEwMCxcbiMgICAgICAgICAxNFxuIyAgICAgXVxuIyB9XG5cblxuIyB7XG4jICAgICBcInIxXCI6IDI4LFxuIyAgICAgXCJyMlwiOiAyOSxcbiMgICAgIFwiZzFcIjogMTEsXG4jICAgICBcImcyXCI6IDEyLFxuIyAgICAgXCJiMVwiOiAwLFxuIyAgICAgXCJiMlwiOiAzLFxuIyAgICAgXCJjb3VudFwiOiAzLFxuIyAgICAgXCJ2b2x1bWVcIjogMTYsXG4jICAgICBcImF2Z1wiOiBbXG4jICAgICAgICAgMjI4LFxuIyAgICAgICAgIDEwMCxcbiMgICAgICAgICAxNFxuIyAgICAgXVxuIyB9XG5cblxuXG5cblxuXG4jIHtcbiMgICAgIFwicjFcIjogOCxcbiMgICAgIFwicjJcIjogNyxcbiMgICAgIFwiZzFcIjogNSxcbiMgICAgIFwiZzJcIjogNSxcbiMgICAgIFwiYjFcIjogMCxcbiMgICAgIFwiYjJcIjogMCxcbiMgICAgIFwiY291bnRcIjogMTkwODk1LFxuIyAgICAgXCJ2b2x1bWVcIjogMCxcbiMgICAgIFwiYXZnXCI6IFtcbiMgICAgICAgICA2MSxcbiMgICAgICAgICA0NCxcbiMgICAgICAgICA0XG4jICAgICBdXG4jIH1cblxuXG4jIHtcbiMgICAgIFwicjFcIjogOCxcbiMgICAgIFwicjJcIjogNyxcbiMgICAgIFwiZzFcIjogNSxcbiMgICAgIFwiZzJcIjogNSxcbiMgICAgIFwiYjFcIjogMCxcbiMgICAgIFwiYjJcIjogMCxcbiMgICAgIFwiY291bnRcIjogMCxcbiMgICAgIFwidm9sdW1lXCI6IDAsXG4jICAgICBcImF2Z1wiOiBbXG4jICAgICAgICAgNjQsXG4jICAgICAgICAgNDQsXG4jICAgICAgICAgNFxuIyAgICAgXVxuIyB9XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=src/quantize.coffee