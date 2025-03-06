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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlcyI6WyIvQGRhc2hraXRlL2NvbG9yLXRoaWVmL3NyYy9lbmdpbmUuY29mZmVlIl0sInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBDIGZyb20gXCIuL2NvbnN0YW50c1wiXG5pbXBvcnQgeyBhcHBseU1lZGlhbkN1dCB9IGZyb20gXCIuL2N1dFwiXG5cblxuY2xhc3MgRW5naW5lXG4gIGNvbnN0cnVjdG9yOiAoeyBAcXVldWUsIEBoaXN0b2dyYW0gfSkgLT5cblxuICBAY3JlYXRlOiAoeyBxdWV1ZSwgaGlzdG9ncmFtIH0pIC0+XG4gICAgbmV3IEVuZ2luZSB7IHF1ZXVlLCBoaXN0b2dyYW0gfVxuXG4gIHJ1bjogKCB0YXJnZXQgKSAtPlxuICAgIGl0ZXJhdGlvbnMgPSAwXG4gICAgY29sb3JDb3VudCA9IDFcblxuICAgIHdoaWxlIGl0ZXJhdGlvbnMgPCBDLm1heEl0ZXJhdGlvbnNcbiAgICAgIHZib3ggPSBAcXVldWUucG9wKClcbiAgICAgIFxuICAgICAgIyBKdXN0IHB1dCBpdCBiYWNrXG4gICAgICBpZiAhdmJveC5jb3VudCgpXG4gICAgICAgIEBxdWV1ZS5wdXNoIHZib3hcbiAgICAgICAgaXRlcmF0aW9ucysrXG4gICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICMgU3BsaXQgdGhlIHNwYWNlXG4gICAgICBbIHZib3gxLCB2Ym94MiBdID0gYXBwbHlNZWRpYW5DdXQgQGhpc3RvZ3JhbSwgdmJveFxuICAgICAgQHF1ZXVlLnB1c2ggdmJveDFcbiAgICAgIGlmIHZib3gyP1xuICAgICAgICBAcXVldWUucHVzaCB2Ym94MlxuICAgICAgICBjb2xvckNvdW50KytcblxuICAgICAgIyBTdG9wIGNvbmRpdGlvbnNcbiAgICAgIGlmIGNvbG9yQ291bnQgPj0gdGFyZ2V0XG4gICAgICAgIHJldHVyblxuICAgICAgaWYgaXRlcmF0aW9ucyA+PSBDLm1heEl0ZXJhdGlvbnNcbiAgICAgICAgcmV0dXJuICMgQ2FuIGhhcHBlbiBpZiB0aGVyZSBhcmUgdG9vIGZldyBwaXhlbHNcblxuXG5cbmV4cG9ydCB7IEVuZ2luZSB9Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7K0JBc0NTLE1BQVQ7Ozs7OzttRUF0Q0E7cUJBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQURBLElBQUE7QUFJTSxTQUFOLE1BQUEsT0FBQTtJQUNFLFdBQWEsQ0FBQyxFQUFHLE9BQUEsTUFBSCxFQUFXLFdBQUEsVUFBQSxFQUFaLENBQUE7UUFBRyxJQUFDLENBQUEsS0FBQSxHQUFBO1FBQU8sSUFBQyxDQUFBLFNBQUEsR0FBQTtJQUFaO0lBRUosT0FBUixNQUFRLENBQUMsRUFBRSxLQUFGLEVBQVMsU0FBVCxFQUFELENBQUEsQ0FBQTtlQUNQLElBQUksTUFBSixDQUFXO1lBQUUsS0FBRjtZQUFTO1FBQVQsQ0FBWDtJQURPO0lBR1QsR0FBSyxDQUFFLE1BQUYsQ0FBQSxDQUFBO1FBQ1AsSUFBQSxVQUFBLEVBQUEsVUFBQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUE7UUFBSSxVQUFBLEdBQWE7UUFDYixVQUFBLEdBQWE7UUFFYixNQUFNLFVBQUEsR0FBYSxDQUFDLFVBQUMsYUFBckIsQ0FBQTtZQUNFLElBQUEsR0FBTyxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBQTtZQUdQLElBQUcsQ0FBQyxJQUFJLENBQUMsS0FBTCxDQUFBLENBQUosRUFBQTtnQkFDRSxJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsQ0FBWSxJQUFaO2dCQUNBLFVBQUE7Z0JBQ0EsU0FIRjthQUhOOztZQVNNLENBQUUsS0FBRixFQUFTLEtBQVQsQ0FBQSxPQUFtQixtQkFBQSxFQUFlLElBQUMsQ0FBQSxTQUFoQixFQUEyQixJQUEzQjtZQUNuQixJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsQ0FBWSxLQUFaO1lBQ0EsSUFBRyxTQUFBLElBQUgsRUFBQTtnQkFDRSxJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsQ0FBWSxLQUFaO2dCQUNBLFVBQUEsR0FGRjthQVhOOztZQWdCTSxJQUFHLFVBQUEsSUFBYyxNQUFqQixFQUFBO2dCQUNFLE9BREY7O1lBRUEsSUFBRyxVQUFBLElBQWMsQ0FBQyxVQUFDLGFBQW5CLEVBQUE7Z0JBQ0UsT0FERjs7UUFuQkY7SUFKRztBQU5QIn0=