"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Engine", {
    enumerable: true,
    get: function() {
        return Engine;
    }
});
const _constants = /*#__PURE__*/ _interop_require_wildcard(require("./constants"));
const _cut = require("./cut");
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
var Engine;
Engine = class Engine {
    constructor({ queue: queue1, histogram: histogram1 }){
        this.queue = queue1;
        this.histogram = histogram1;
    }
    static create({ queue, histogram }) {
        return new Engine({
            queue,
            histogram
        });
    }
    run(target) {
        var colorCount, iterations, vbox, vbox1, vbox2;
        iterations = 0;
        colorCount = 1;
        while(iterations < _constants.maxIterations){
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
            if (iterations >= _constants.maxIterations) {
                return;
            }
        }
    }
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS9jb2xvci10aGllZi9zcmMvZW5naW5lLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8sQ0FBQSxLQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLGNBQVQ7Q0FBQSxNQUFBOztBQUdNLFNBQU4sTUFBQSxPQUFBO0VBQ0UsV0FBYSxDQUFDO01BQUcsYUFBSDtNQUFXO0lBQVgsQ0FBRCxDQUFBO0lBQUcsSUFBQyxDQUFBO0lBQU8sSUFBQyxDQUFBO0VBQVo7O0VBRUosT0FBUixNQUFRLENBQUMsQ0FBRSxLQUFGLEVBQVMsU0FBVCxDQUFELENBQUE7V0FDUCxJQUFJLE1BQUosQ0FBVyxDQUFFLEtBQUYsRUFBUyxTQUFULENBQVg7RUFETzs7RUFHVCxHQUFLLENBQUUsTUFBRixDQUFBO0FBQ1AsUUFBQSxVQUFBLEVBQUEsVUFBQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUE7SUFBSSxVQUFBLEdBQWE7SUFDYixVQUFBLEdBQWE7QUFFYixXQUFNLFVBQUEsR0FBYSxDQUFDLENBQUMsYUFBckI7TUFDRSxJQUFBLEdBQU8sSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQUE7TUFHUCxJQUFHLENBQUMsSUFBSSxDQUFDLEtBQUwsQ0FBQSxDQUFKO1FBQ0UsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQVksSUFBWjtRQUNBLFVBQUE7QUFDQSxpQkFIRjtPQUhOOztNQVNNLENBQUUsS0FBRixFQUFTLEtBQVQsQ0FBQSxHQUFtQixjQUFBLENBQWUsSUFBQyxDQUFBLFNBQWhCLEVBQTJCLElBQTNCO01BQ25CLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFZLEtBQVo7TUFDQSxJQUFHLGFBQUg7UUFDRSxJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsQ0FBWSxLQUFaO1FBQ0EsVUFBQSxHQUZGO09BWE47O01BZ0JNLElBQUcsVUFBQSxJQUFjLE1BQWpCO0FBQ0UsZUFERjs7TUFFQSxJQUFHLFVBQUEsSUFBYyxDQUFDLENBQUMsYUFBbkI7QUFDRSxlQURGOztJQW5CRjtFQUpHOztBQU5QOztBQWtDQSxPQUFBO0VBQVMsTUFBVCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEMgZnJvbSBcIi4vY29uc3RhbnRzXCJcbmltcG9ydCB7IGFwcGx5TWVkaWFuQ3V0IH0gZnJvbSBcIi4vY3V0XCJcblxuXG5jbGFzcyBFbmdpbmVcbiAgY29uc3RydWN0b3I6ICh7IEBxdWV1ZSwgQGhpc3RvZ3JhbSB9KSAtPlxuXG4gIEBjcmVhdGU6ICh7IHF1ZXVlLCBoaXN0b2dyYW0gfSkgLT5cbiAgICBuZXcgRW5naW5lIHsgcXVldWUsIGhpc3RvZ3JhbSB9XG5cbiAgcnVuOiAoIHRhcmdldCApIC0+XG4gICAgaXRlcmF0aW9ucyA9IDBcbiAgICBjb2xvckNvdW50ID0gMVxuXG4gICAgd2hpbGUgaXRlcmF0aW9ucyA8IEMubWF4SXRlcmF0aW9uc1xuICAgICAgdmJveCA9IEBxdWV1ZS5wb3AoKVxuICAgICAgXG4gICAgICAjIEp1c3QgcHV0IGl0IGJhY2tcbiAgICAgIGlmICF2Ym94LmNvdW50KClcbiAgICAgICAgQHF1ZXVlLnB1c2ggdmJveFxuICAgICAgICBpdGVyYXRpb25zKytcbiAgICAgICAgY29udGludWVcblxuICAgICAgIyBTcGxpdCB0aGUgc3BhY2VcbiAgICAgIFsgdmJveDEsIHZib3gyIF0gPSBhcHBseU1lZGlhbkN1dCBAaGlzdG9ncmFtLCB2Ym94XG4gICAgICBAcXVldWUucHVzaCB2Ym94MVxuICAgICAgaWYgdmJveDI/XG4gICAgICAgIEBxdWV1ZS5wdXNoIHZib3gyXG4gICAgICAgIGNvbG9yQ291bnQrK1xuXG4gICAgICAjIFN0b3AgY29uZGl0aW9uc1xuICAgICAgaWYgY29sb3JDb3VudCA+PSB0YXJnZXRcbiAgICAgICAgcmV0dXJuXG4gICAgICBpZiBpdGVyYXRpb25zID49IEMubWF4SXRlcmF0aW9uc1xuICAgICAgICByZXR1cm4gIyBDYW4gaGFwcGVuIGlmIHRoZXJlIGFyZSB0b28gZmV3IHBpeGVsc1xuXG5cblxuZXhwb3J0IHsgRW5naW5lIH0iXX0=
 //# sourceURL=/@dashkite/color-thief/src/engine.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvY29sb3ItdGhpZWYvc3JjL2VuZ2luZS5jb2ZmZWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQyBmcm9tIFwiLi9jb25zdGFudHNcIlxuaW1wb3J0IHsgYXBwbHlNZWRpYW5DdXQgfSBmcm9tIFwiLi9jdXRcIlxuXG5cbmNsYXNzIEVuZ2luZVxuICBjb25zdHJ1Y3RvcjogKHsgQHF1ZXVlLCBAaGlzdG9ncmFtIH0pIC0+XG5cbiAgQGNyZWF0ZTogKHsgcXVldWUsIGhpc3RvZ3JhbSB9KSAtPlxuICAgIG5ldyBFbmdpbmUgeyBxdWV1ZSwgaGlzdG9ncmFtIH1cblxuICBydW46ICggdGFyZ2V0ICkgLT5cbiAgICBpdGVyYXRpb25zID0gMFxuICAgIGNvbG9yQ291bnQgPSAxXG5cbiAgICB3aGlsZSBpdGVyYXRpb25zIDwgQy5tYXhJdGVyYXRpb25zXG4gICAgICB2Ym94ID0gQHF1ZXVlLnBvcCgpXG4gICAgICBcbiAgICAgICMgSnVzdCBwdXQgaXQgYmFja1xuICAgICAgaWYgIXZib3guY291bnQoKVxuICAgICAgICBAcXVldWUucHVzaCB2Ym94XG4gICAgICAgIGl0ZXJhdGlvbnMrK1xuICAgICAgICBjb250aW51ZVxuXG4gICAgICAjIFNwbGl0IHRoZSBzcGFjZVxuICAgICAgWyB2Ym94MSwgdmJveDIgXSA9IGFwcGx5TWVkaWFuQ3V0IEBoaXN0b2dyYW0sIHZib3hcbiAgICAgIEBxdWV1ZS5wdXNoIHZib3gxXG4gICAgICBpZiB2Ym94Mj9cbiAgICAgICAgQHF1ZXVlLnB1c2ggdmJveDJcbiAgICAgICAgY29sb3JDb3VudCsrXG5cbiAgICAgICMgU3RvcCBjb25kaXRpb25zXG4gICAgICBpZiBjb2xvckNvdW50ID49IHRhcmdldFxuICAgICAgICByZXR1cm5cbiAgICAgIGlmIGl0ZXJhdGlvbnMgPj0gQy5tYXhJdGVyYXRpb25zXG4gICAgICAgIHJldHVybiAjIENhbiBoYXBwZW4gaWYgdGhlcmUgYXJlIHRvbyBmZXcgcGl4ZWxzXG5cblxuXG5leHBvcnQgeyBFbmdpbmUgfSJdLCJuYW1lcyI6WyJFbmdpbmUiLCJjb25zdHJ1Y3RvciIsInF1ZXVlIiwicXVldWUxIiwiaGlzdG9ncmFtIiwiaGlzdG9ncmFtMSIsImNyZWF0ZSIsInJ1biIsInRhcmdldCIsImNvbG9yQ291bnQiLCJpdGVyYXRpb25zIiwidmJveCIsInZib3gxIiwidmJveDIiLCJDIiwibWF4SXRlcmF0aW9ucyIsInBvcCIsImNvdW50IiwicHVzaCIsImFwcGx5TWVkaWFuQ3V0Il0sIm1hcHBpbmdzIjoiOzs7OytCQXNDU0E7OztlQUFBQTs7O21FQXRDVDtxQkFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBREEsSUFBQUE7QUFJTUEsU0FBTixNQUFBQTtJQUNFQyxZQUFjLEVBQUdDLE9BQUFDLE1BQUgsRUFBV0MsV0FBQUMsVUFBQSxFQUFaLENBQUE7UUFBRyxJQUFDLENBQUFILEtBQUEsR0FBQUM7UUFBTyxJQUFDLENBQUFDLFNBQUEsR0FBQUM7SUFBWjtJQUVKLE9BQVJDLE9BQVMsRUFBRUosS0FBRixFQUFTRSxTQUFULEVBQUQsRUFBQTtlQUNQLElBQUlKLE9BQU87WUFBRUU7WUFBT0U7UUFBVDtJQURKO0lBR1RHLElBQU9DLE1BQUYsRUFBQTtRQUNQLElBQUFDLFlBQUFDLFlBQUFDLE1BQUFDLE9BQUFDO1FBQUlILGFBQWE7UUFDYkQsYUFBYTtRQUViLE1BQU1DLGFBQWFJLFdBQUVDLGFBQXJCLENBQUE7WUFDRUosT0FBTyxJQUFDLENBQUFULEtBQUssQ0FBQ2MsR0FBUDtZQUdQLElBQUcsQ0FBQ0wsS0FBS00sS0FBTCxJQUFKO2dCQUNFLElBQUMsQ0FBQWYsS0FBSyxDQUFDZ0IsSUFBUCxDQUFZUDtnQkFDWkQ7Z0JBQ0E7OztZQUdGLENBQUVFLE9BQU9DLE1BQVQsR0FBbUJNLElBQUFBLG1CQUFBLEVBQWUsSUFBQyxDQUFBZixTQUFoQixFQUEyQk87WUFDOUMsSUFBQyxDQUFBVCxLQUFLLENBQUNnQixJQUFQLENBQVlOO1lBQ1osSUFBR0MsU0FBQSxNQUFIO2dCQUNFLElBQUMsQ0FBQVgsS0FBSyxDQUFDZ0IsSUFBUCxDQUFZTDtnQkFDWko7OztZQUdGLElBQUdBLGNBQWNELFFBQWpCO2dCQUNFOztZQUNGLElBQUdFLGNBQWNJLFdBQUVDLGFBQW5CLEVBQUE7Z0JBQ0U7O1FBcEJKO0lBSkc7QUFOUCJ9