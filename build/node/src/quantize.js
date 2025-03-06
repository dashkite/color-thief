"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "quantize", {
    enumerable: true,
    get: function() {
        return quantize;
    }
});
const _constants = /*#__PURE__*/ _interop_require_wildcard(require("./constants"));
const _pv = /*#__PURE__*/ _interop_require_wildcard(require("./pv"));
const _queue = require("./queue");
const _vbox = require("./vbox");
const _colormap = require("./color-map");
const _histogram = require("./histogram");
const _engine = require("./engine");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
var compareOccupancy, comparePopulation, quantize;
comparePopulation = function(a, b) {
    return _pv.naturalOrder(a.count(), b.count());
};
compareOccupancy = function(a, b) {
    return _pv.naturalOrder(a.count() * a.volume(), b.count() * b.volume());
};
quantize = function(pixels, maxColors) {
    var colorMap, engine, histogram, histogramSize, queue1, queue2, vbox;
    histogram = (0, _histogram.getHistogram)(pixels);
    histogramSize = 1 << 3 * _constants.sigbits;
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
    engine.run(_constants.populationFraction * maxColors);
    // re-sort by the product of pixel occupancy times the size in color space.
    queue2 = _queue.Queue.create({
        compare: compareOccupancy
    });
    while(queue1.size > 0){
        queue2.push(queue1.pop());
    }
    // next set - generate the median cuts using the (npix * vol) sorting.
    engine.queue = queue2;
    engine.run(maxColors - queue2.size);
    // calculate the actual colors
    colorMap = _colormap.ColorMap.create();
    while(queue2.size > 0){
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
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS9jb2xvci10aGllZi9zcmMvcXVhbnRpemUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsZ0JBQUEsRUFBQSxpQkFBQSxFQUFBOztBQUFBLE9BQU8sQ0FBQSxLQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLE1BQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsS0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxRQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsWUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE1BQVQ7Q0FBQSxNQUFBOztBQUdBLGlCQUFBLEdBQW9CLFFBQUEsQ0FBRSxDQUFGLEVBQUssQ0FBTCxDQUFBO1NBQ2xCLEVBQUUsQ0FBQyxZQUFILENBQWdCLENBQUMsQ0FBQyxLQUFGLENBQUEsQ0FBaEIsRUFBMkIsQ0FBQyxDQUFDLEtBQUYsQ0FBQSxDQUEzQjtBQURrQjs7QUFHcEIsZ0JBQUEsR0FBbUIsUUFBQSxDQUFFLENBQUYsRUFBSyxDQUFMLENBQUE7U0FDakIsRUFBRSxDQUFDLFlBQUgsQ0FBaUIsQ0FBQyxDQUFDLEtBQUYsQ0FBQSxDQUFBLEdBQVksQ0FBQyxDQUFDLE1BQUYsQ0FBQSxDQUE3QixFQUEyQyxDQUFDLENBQUMsS0FBRixDQUFBLENBQUEsR0FBWSxDQUFDLENBQUMsTUFBRixDQUFBLENBQXZEO0FBRGlCOztBQUluQixRQUFBLEdBQVcsUUFBQSxDQUFFLE1BQUYsRUFBVSxTQUFWLENBQUE7QUFDWCxNQUFBLFFBQUEsRUFBQSxNQUFBLEVBQUEsU0FBQSxFQUFBLGFBQUEsRUFBQSxNQUFBLEVBQUEsTUFBQSxFQUFBO0VBQUUsU0FBQSxHQUFZLFlBQUEsQ0FBYSxNQUFiO0VBQ1osYUFBQSxHQUFnQixDQUFBLElBQUssQ0FBRSxDQUFBLEdBQUksQ0FBQyxDQUFDLE9BQVIsRUFEdkI7O0VBSUUsSUFBQSxHQUFPLElBQUksQ0FBQyxVQUFMLENBQWdCLE1BQWhCLEVBQXdCLFNBQXhCO0VBQ1AsTUFBQSxHQUFTLEtBQUssQ0FBQyxNQUFOLENBQWE7SUFBQSxPQUFBLEVBQVM7RUFBVCxDQUFiO0VBQ1QsTUFBTSxDQUFDLElBQVAsQ0FBWSxJQUFaLEVBTkY7OztFQVNFLE1BQUEsR0FBUyxNQUFNLENBQUMsTUFBUCxDQUFjO0lBQUUsS0FBQSxFQUFPLE1BQVQ7SUFBaUI7RUFBakIsQ0FBZDtFQUNULE1BQU0sQ0FBQyxHQUFQLENBQVcsQ0FBQyxDQUFDLGtCQUFGLEdBQXVCLFNBQWxDLEVBVkY7O0VBYUUsTUFBQSxHQUFTLEtBQUssQ0FBQyxNQUFOLENBQWE7SUFBQSxPQUFBLEVBQVM7RUFBVCxDQUFiO0FBQ1QsU0FBTSxNQUFNLENBQUMsSUFBUCxHQUFjLENBQXBCO0lBQ0UsTUFBTSxDQUFDLElBQVAsQ0FBWSxNQUFNLENBQUMsR0FBUCxDQUFBLENBQVo7RUFERixDQWRGOzs7RUFrQkUsTUFBTSxDQUFDLEtBQVAsR0FBZTtFQUNmLE1BQU0sQ0FBQyxHQUFQLENBQVcsU0FBQSxHQUFZLE1BQU0sQ0FBQyxJQUE5QixFQW5CRjs7RUFzQkUsUUFBQSxHQUFXLFFBQVEsQ0FBQyxNQUFULENBQUE7QUFDWCxTQUFNLE1BQU0sQ0FBQyxJQUFQLEdBQWMsQ0FBcEI7SUFDRSxRQUFRLENBQUMsSUFBVCxDQUFjLE1BQU0sQ0FBQyxHQUFQLENBQUEsQ0FBZDtFQURGO1NBR0E7QUEzQlM7O0FBNkJYLE9BQUE7RUFBUyxRQUFUOzs7QUE3Q0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBDIGZyb20gXCIuL2NvbnN0YW50c1wiXG5pbXBvcnQgKiBhcyBwdiBmcm9tIFwiLi9wdlwiXG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gXCIuL3F1ZXVlXCJcbmltcG9ydCB7IFZCb3ggfSBmcm9tIFwiLi92Ym94XCJcbmltcG9ydCB7IENvbG9yTWFwIH0gZnJvbSBcIi4vY29sb3ItbWFwXCJcbmltcG9ydCB7IGdldEhpc3RvZ3JhbSB9IGZyb20gXCIuL2hpc3RvZ3JhbVwiXG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmVcIlxuXG5cbmNvbXBhcmVQb3B1bGF0aW9uID0gKCBhLCBiICkgLT4gXG4gIHB2Lm5hdHVyYWxPcmRlciBhLmNvdW50KCksIGIuY291bnQoKVxuXG5jb21wYXJlT2NjdXBhbmN5ID0gKCBhLCBiICkgLT5cbiAgcHYubmF0dXJhbE9yZGVyIChhLmNvdW50KCkgKiBhLnZvbHVtZSgpKSwgKGIuY291bnQoKSAqIGIudm9sdW1lKCkpXG5cblxucXVhbnRpemUgPSAoIHBpeGVscywgbWF4Q29sb3JzICkgLT4gICAgICAgIFxuICBoaXN0b2dyYW0gPSBnZXRIaXN0b2dyYW0gcGl4ZWxzXG4gIGhpc3RvZ3JhbVNpemUgPSAxIDw8ICggMyAqIEMuc2lnYml0cyApXG5cbiAgIyBnZXQgdGhlIHN0YXJ0aW5nIHZib3ggZnJvbSB0aGUgY29sb3JzXG4gIHZib3ggPSBWQm94LmZyb21QaXhlbHMgcGl4ZWxzLCBoaXN0b2dyYW1cbiAgcXVldWUxID0gUXVldWUuY3JlYXRlIGNvbXBhcmU6IGNvbXBhcmVQb3B1bGF0aW9uXG4gIHF1ZXVlMS5wdXNoIHZib3hcbiAgXG4gICMgZmlyc3Qgc2V0IG9mIGNvbG9ycywgc29ydGVkIGJ5IHBvcHVsYXRpb25cbiAgZW5naW5lID0gRW5naW5lLmNyZWF0ZSB7IHF1ZXVlOiBxdWV1ZTEsIGhpc3RvZ3JhbSB9XG4gIGVuZ2luZS5ydW4gQy5wb3B1bGF0aW9uRnJhY3Rpb24gKiBtYXhDb2xvcnNcblxuICAjIHJlLXNvcnQgYnkgdGhlIHByb2R1Y3Qgb2YgcGl4ZWwgb2NjdXBhbmN5IHRpbWVzIHRoZSBzaXplIGluIGNvbG9yIHNwYWNlLlxuICBxdWV1ZTIgPSBRdWV1ZS5jcmVhdGUgY29tcGFyZTogY29tcGFyZU9jY3VwYW5jeVxuICB3aGlsZSBxdWV1ZTEuc2l6ZSA+IDBcbiAgICBxdWV1ZTIucHVzaCBxdWV1ZTEucG9wKClcbiAgXG4gICMgbmV4dCBzZXQgLSBnZW5lcmF0ZSB0aGUgbWVkaWFuIGN1dHMgdXNpbmcgdGhlIChucGl4ICogdm9sKSBzb3J0aW5nLlxuICBlbmdpbmUucXVldWUgPSBxdWV1ZTJcbiAgZW5naW5lLnJ1biBtYXhDb2xvcnMgLSBxdWV1ZTIuc2l6ZVxuXG4gICMgY2FsY3VsYXRlIHRoZSBhY3R1YWwgY29sb3JzXG4gIGNvbG9yTWFwID0gQ29sb3JNYXAuY3JlYXRlKClcbiAgd2hpbGUgcXVldWUyLnNpemUgPiAwXG4gICAgY29sb3JNYXAucHVzaCBxdWV1ZTIucG9wKCkgIFxuICBcbiAgY29sb3JNYXBcblxuZXhwb3J0IHsgcXVhbnRpemUgfVxuXG5cblxuXG5cbiMge1xuIyAgICAgXCJyMVwiOiAyOCxcbiMgICAgIFwicjJcIjogMjksXG4jICAgICBcImcxXCI6IDExLFxuIyAgICAgXCJnMlwiOiAxMixcbiMgICAgIFwiYjFcIjogMCxcbiMgICAgIFwiYjJcIjogMyxcbiMgICAgIFwiY291bnRcIjogMyxcbiMgICAgIFwidm9sdW1lXCI6IDE2LFxuIyAgICAgXCJhdmdcIjogW1xuIyAgICAgICAgIDIyOCxcbiMgICAgICAgICAxMDAsXG4jICAgICAgICAgMTRcbiMgICAgIF1cbiMgfVxuXG5cbiMge1xuIyAgICAgXCJyMVwiOiAyOCxcbiMgICAgIFwicjJcIjogMjksXG4jICAgICBcImcxXCI6IDExLFxuIyAgICAgXCJnMlwiOiAxMixcbiMgICAgIFwiYjFcIjogMCxcbiMgICAgIFwiYjJcIjogMyxcbiMgICAgIFwiY291bnRcIjogMyxcbiMgICAgIFwidm9sdW1lXCI6IDE2LFxuIyAgICAgXCJhdmdcIjogW1xuIyAgICAgICAgIDIyOCxcbiMgICAgICAgICAxMDAsXG4jICAgICAgICAgMTRcbiMgICAgIF1cbiMgfVxuXG5cblxuXG5cblxuIyB7XG4jICAgICBcInIxXCI6IDgsXG4jICAgICBcInIyXCI6IDcsXG4jICAgICBcImcxXCI6IDUsXG4jICAgICBcImcyXCI6IDUsXG4jICAgICBcImIxXCI6IDAsXG4jICAgICBcImIyXCI6IDAsXG4jICAgICBcImNvdW50XCI6IDE5MDg5NSxcbiMgICAgIFwidm9sdW1lXCI6IDAsXG4jICAgICBcImF2Z1wiOiBbXG4jICAgICAgICAgNjEsXG4jICAgICAgICAgNDQsXG4jICAgICAgICAgNFxuIyAgICAgXVxuIyB9XG5cblxuIyB7XG4jICAgICBcInIxXCI6IDgsXG4jICAgICBcInIyXCI6IDcsXG4jICAgICBcImcxXCI6IDUsXG4jICAgICBcImcyXCI6IDUsXG4jICAgICBcImIxXCI6IDAsXG4jICAgICBcImIyXCI6IDAsXG4jICAgICBcImNvdW50XCI6IDAsXG4jICAgICBcInZvbHVtZVwiOiAwLFxuIyAgICAgXCJhdmdcIjogW1xuIyAgICAgICAgIDY0LFxuIyAgICAgICAgIDQ0LFxuIyAgICAgICAgIDRcbiMgICAgIF1cbiMgfVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iXX0=
 //# sourceURL=/@dashkite/color-thief/src/quantize.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlcyI6WyIvQGRhc2hraXRlL2NvbG9yLXRoaWVmL3NyYy9xdWFudGl6ZS5jb2ZmZWUiXSwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEMgZnJvbSBcIi4vY29uc3RhbnRzXCJcbmltcG9ydCAqIGFzIHB2IGZyb20gXCIuL3B2XCJcbmltcG9ydCB7IFF1ZXVlIH0gZnJvbSBcIi4vcXVldWVcIlxuaW1wb3J0IHsgVkJveCB9IGZyb20gXCIuL3Zib3hcIlxuaW1wb3J0IHsgQ29sb3JNYXAgfSBmcm9tIFwiLi9jb2xvci1tYXBcIlxuaW1wb3J0IHsgZ2V0SGlzdG9ncmFtIH0gZnJvbSBcIi4vaGlzdG9ncmFtXCJcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiXG5cblxuY29tcGFyZVBvcHVsYXRpb24gPSAoIGEsIGIgKSAtPiBcbiAgcHYubmF0dXJhbE9yZGVyIGEuY291bnQoKSwgYi5jb3VudCgpXG5cbmNvbXBhcmVPY2N1cGFuY3kgPSAoIGEsIGIgKSAtPlxuICBwdi5uYXR1cmFsT3JkZXIgKGEuY291bnQoKSAqIGEudm9sdW1lKCkpLCAoYi5jb3VudCgpICogYi52b2x1bWUoKSlcblxuXG5xdWFudGl6ZSA9ICggcGl4ZWxzLCBtYXhDb2xvcnMgKSAtPiAgICAgICAgXG4gIGhpc3RvZ3JhbSA9IGdldEhpc3RvZ3JhbSBwaXhlbHNcbiAgaGlzdG9ncmFtU2l6ZSA9IDEgPDwgKCAzICogQy5zaWdiaXRzIClcblxuICAjIGdldCB0aGUgc3RhcnRpbmcgdmJveCBmcm9tIHRoZSBjb2xvcnNcbiAgdmJveCA9IFZCb3guZnJvbVBpeGVscyBwaXhlbHMsIGhpc3RvZ3JhbVxuICBxdWV1ZTEgPSBRdWV1ZS5jcmVhdGUgY29tcGFyZTogY29tcGFyZVBvcHVsYXRpb25cbiAgcXVldWUxLnB1c2ggdmJveFxuICBcbiAgIyBmaXJzdCBzZXQgb2YgY29sb3JzLCBzb3J0ZWQgYnkgcG9wdWxhdGlvblxuICBlbmdpbmUgPSBFbmdpbmUuY3JlYXRlIHsgcXVldWU6IHF1ZXVlMSwgaGlzdG9ncmFtIH1cbiAgZW5naW5lLnJ1biBDLnBvcHVsYXRpb25GcmFjdGlvbiAqIG1heENvbG9yc1xuXG4gICMgcmUtc29ydCBieSB0aGUgcHJvZHVjdCBvZiBwaXhlbCBvY2N1cGFuY3kgdGltZXMgdGhlIHNpemUgaW4gY29sb3Igc3BhY2UuXG4gIHF1ZXVlMiA9IFF1ZXVlLmNyZWF0ZSBjb21wYXJlOiBjb21wYXJlT2NjdXBhbmN5XG4gIHdoaWxlIHF1ZXVlMS5zaXplID4gMFxuICAgIHF1ZXVlMi5wdXNoIHF1ZXVlMS5wb3AoKVxuICBcbiAgIyBuZXh0IHNldCAtIGdlbmVyYXRlIHRoZSBtZWRpYW4gY3V0cyB1c2luZyB0aGUgKG5waXggKiB2b2wpIHNvcnRpbmcuXG4gIGVuZ2luZS5xdWV1ZSA9IHF1ZXVlMlxuICBlbmdpbmUucnVuIG1heENvbG9ycyAtIHF1ZXVlMi5zaXplXG5cbiAgIyBjYWxjdWxhdGUgdGhlIGFjdHVhbCBjb2xvcnNcbiAgY29sb3JNYXAgPSBDb2xvck1hcC5jcmVhdGUoKVxuICB3aGlsZSBxdWV1ZTIuc2l6ZSA+IDBcbiAgICBjb2xvck1hcC5wdXNoIHF1ZXVlMi5wb3AoKSAgXG4gIFxuICBjb2xvck1hcFxuXG5leHBvcnQgeyBxdWFudGl6ZSB9XG5cblxuXG5cblxuIyB7XG4jICAgICBcInIxXCI6IDI4LFxuIyAgICAgXCJyMlwiOiAyOSxcbiMgICAgIFwiZzFcIjogMTEsXG4jICAgICBcImcyXCI6IDEyLFxuIyAgICAgXCJiMVwiOiAwLFxuIyAgICAgXCJiMlwiOiAzLFxuIyAgICAgXCJjb3VudFwiOiAzLFxuIyAgICAgXCJ2b2x1bWVcIjogMTYsXG4jICAgICBcImF2Z1wiOiBbXG4jICAgICAgICAgMjI4LFxuIyAgICAgICAgIDEwMCxcbiMgICAgICAgICAxNFxuIyAgICAgXVxuIyB9XG5cblxuIyB7XG4jICAgICBcInIxXCI6IDI4LFxuIyAgICAgXCJyMlwiOiAyOSxcbiMgICAgIFwiZzFcIjogMTEsXG4jICAgICBcImcyXCI6IDEyLFxuIyAgICAgXCJiMVwiOiAwLFxuIyAgICAgXCJiMlwiOiAzLFxuIyAgICAgXCJjb3VudFwiOiAzLFxuIyAgICAgXCJ2b2x1bWVcIjogMTYsXG4jICAgICBcImF2Z1wiOiBbXG4jICAgICAgICAgMjI4LFxuIyAgICAgICAgIDEwMCxcbiMgICAgICAgICAxNFxuIyAgICAgXVxuIyB9XG5cblxuXG5cblxuXG4jIHtcbiMgICAgIFwicjFcIjogOCxcbiMgICAgIFwicjJcIjogNyxcbiMgICAgIFwiZzFcIjogNSxcbiMgICAgIFwiZzJcIjogNSxcbiMgICAgIFwiYjFcIjogMCxcbiMgICAgIFwiYjJcIjogMCxcbiMgICAgIFwiY291bnRcIjogMTkwODk1LFxuIyAgICAgXCJ2b2x1bWVcIjogMCxcbiMgICAgIFwiYXZnXCI6IFtcbiMgICAgICAgICA2MSxcbiMgICAgICAgICA0NCxcbiMgICAgICAgICA0XG4jICAgICBdXG4jIH1cblxuXG4jIHtcbiMgICAgIFwicjFcIjogOCxcbiMgICAgIFwicjJcIjogNyxcbiMgICAgIFwiZzFcIjogNSxcbiMgICAgIFwiZzJcIjogNSxcbiMgICAgIFwiYjFcIjogMCxcbiMgICAgIFwiYjJcIjogMCxcbiMgICAgIFwiY291bnRcIjogMCxcbiMgICAgIFwidm9sdW1lXCI6IDAsXG4jICAgICBcImF2Z1wiOiBbXG4jICAgICAgICAgNjQsXG4jICAgICAgICAgNDQsXG4jICAgICAgICAgNFxuIyAgICAgXVxuIyB9XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O2VBNkNTLFFBQVQ7OzttRUE3Q0E7NERBQ0E7dUJBQ0E7c0JBQ0E7MEJBQ0E7MkJBQ0E7d0JBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU5BLElBQUEsZ0JBQUEsRUFBQSxpQkFBQSxFQUFBO0FBU0EsaUJBQUEsR0FBb0IsUUFBQSxDQUFFLENBQUYsRUFBSyxDQUFMLENBQUE7V0FDbEIsRUFBRSxFQUFDLFlBQUgsQ0FBZ0IsQ0FBQyxDQUFDLEtBQUYsQ0FBQSxDQUFoQixFQUEyQixDQUFDLENBQUMsS0FBRixDQUFBLENBQTNCO0FBRGtCO0FBR3BCLGdCQUFBLEdBQW1CLFFBQUEsQ0FBRSxDQUFGLEVBQUssQ0FBTCxDQUFBO1dBQ2pCLEVBQUUsRUFBQyxZQUFILENBQWlCLENBQUMsQ0FBQyxLQUFGLENBQUEsQ0FBQSxHQUFZLENBQUMsQ0FBQyxNQUFGLENBQUEsQ0FBN0IsRUFBMkMsQ0FBQyxDQUFDLEtBQUYsQ0FBQSxDQUFBLEdBQVksQ0FBQyxDQUFDLE1BQUYsQ0FBQSxDQUF2RDtBQURpQjtBQUluQixRQUFBLEdBQVcsUUFBQSxDQUFFLE1BQUYsRUFBVSxTQUFWLENBQUE7SUFDWCxJQUFBLFFBQUEsRUFBQSxNQUFBLEVBQUEsU0FBQSxFQUFBLGFBQUEsRUFBQSxNQUFBLEVBQUEsTUFBQSxFQUFBO0lBQUUsU0FBQSxPQUFZLHVCQUFBLEVBQWEsTUFBYjtJQUNaLGFBQUEsR0FBZ0IsQ0FBQSxJQUFLLEFBQUUsQ0FBQSxHQUFJLENBQUMsVUFBQyxPQUFSLEVBRHZCOztJQUlFLElBQUEsR0FBTyxVQUFJLENBQUMsVUFBTCxDQUFnQixNQUFoQixFQUF3QixTQUF4QjtJQUNQLE1BQUEsR0FBUyxZQUFLLENBQUMsTUFBTixDQUFhO1FBQUEsT0FBQSxFQUFTO0lBQVQsQ0FBYjtJQUNULE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBWixFQU5GOztJQVNFLE1BQUEsR0FBUyxjQUFNLENBQUMsTUFBUCxDQUFjO1FBQUUsS0FBQSxFQUFPLE1BQVQ7UUFBaUI7SUFBakIsQ0FBZDtJQUNULE1BQU0sQ0FBQyxHQUFQLENBQVcsQ0FBQyxVQUFDLGtCQUFGLEdBQXVCLFNBQWxDLEVBVkY7O0lBYUUsTUFBQSxHQUFTLFlBQUssQ0FBQyxNQUFOLENBQWE7UUFBQSxPQUFBLEVBQVM7SUFBVCxDQUFiO0lBQ1QsTUFBTSxNQUFNLENBQUMsSUFBUCxHQUFjLENBQXBCLENBQUE7UUFDRSxNQUFNLENBQUMsSUFBUCxDQUFZLE1BQU0sQ0FBQyxHQUFQLENBQUEsQ0FBWjtJQURGLENBZEY7O0lBa0JFLE1BQU0sQ0FBQyxLQUFQLEdBQWU7SUFDZixNQUFNLENBQUMsR0FBUCxDQUFXLFNBQUEsR0FBWSxNQUFNLENBQUMsSUFBOUIsRUFuQkY7O0lBc0JFLFFBQUEsR0FBVyxrQkFBUSxDQUFDLE1BQVQsQ0FBQTtJQUNYLE1BQU0sTUFBTSxDQUFDLElBQVAsR0FBYyxDQUFwQixDQUFBO1FBQ0UsUUFBUSxDQUFDLElBQVQsQ0FBYyxNQUFNLENBQUMsR0FBUCxDQUFBLENBQWQ7SUFERjtXQUdBO0FBM0JTO0NBaEJYLElBQUEifQ==