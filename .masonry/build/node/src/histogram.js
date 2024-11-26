"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getColorIndex: function() {
        return getColorIndex;
    },
    getHistogram: function() {
        return getHistogram;
    }
});
const _constants = /*#__PURE__*/ _interop_require_wildcard(require("./constants"));
const _pv = /*#__PURE__*/ _interop_require_wildcard(require("./pv"));
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
var getColorIndex, getHistogram;
getColorIndex = function(r, g, b) {
    return (r << 2 * _constants.sigbits) + (g << _constants.sigbits) + b;
};
// Histogram is a 1D array, giving the number of pixels in each quantized region
getHistogram = function(pixels) {
    var b, current, g, histogram, i, index, len, pixel, r, ref, size;
    size = 1 << 3 * _constants.sigbits;
    histogram = new Array(size);
    for(i = 0, len = pixels.length; i < len; i++){
        pixel = pixels[i];
        r = pixel[0] >> _constants.rshift;
        g = pixel[1] >> _constants.rshift;
        b = pixel[2] >> _constants.rshift;
        index = getColorIndex(r, g, b);
        current = (ref = histogram[index]) != null ? ref : 0;
        histogram[index] = current + 1;
    }
    return histogram;
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS9jb2xvci10aGllZi9zcmMvaGlzdG9ncmFtLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGFBQUEsRUFBQTs7QUFBQSxPQUFPLENBQUEsS0FBUCxNQUFBOztBQUNBLE9BQU8sQ0FBQSxNQUFQLE1BQUE7O0FBR0EsYUFBQSxHQUFnQixRQUFBLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSLENBQUE7U0FDZCxDQUFDLENBQUEsSUFBSyxDQUFDLENBQUEsR0FBSSxDQUFDLENBQUMsT0FBUCxDQUFOLENBQUEsR0FBeUIsQ0FBQyxDQUFBLElBQUssQ0FBQyxDQUFDLE9BQVIsQ0FBekIsR0FBNEM7QUFEOUIsRUFKaEI7OztBQVFBLFlBQUEsR0FBZSxRQUFBLENBQUUsTUFBRixDQUFBO0FBQ2YsTUFBQSxDQUFBLEVBQUEsT0FBQSxFQUFBLENBQUEsRUFBQSxTQUFBLEVBQUEsQ0FBQSxFQUFBLEtBQUEsRUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUE7RUFBRSxJQUFBLEdBQU8sQ0FBQSxJQUFLLENBQUUsQ0FBQSxHQUFJLENBQUMsQ0FBQyxPQUFSO0VBQ1osU0FBQSxHQUFZLElBQUksS0FBSixDQUFVLElBQVY7RUFFWixLQUFBLHdDQUFBOztJQUNFLENBQUEsR0FBSSxLQUFLLENBQUMsQ0FBRCxDQUFMLElBQVksQ0FBQyxDQUFDO0lBQ2xCLENBQUEsR0FBSSxLQUFLLENBQUMsQ0FBRCxDQUFMLElBQVksQ0FBQyxDQUFDO0lBQ2xCLENBQUEsR0FBSSxLQUFLLENBQUMsQ0FBRCxDQUFMLElBQVksQ0FBQyxDQUFDO0lBQ2xCLEtBQUEsR0FBUSxhQUFBLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixDQUFwQjtJQUNSLE9BQUEsNENBQTZCO0lBQzdCLFNBQVMsQ0FBQyxLQUFELENBQVQsR0FBbUIsT0FBQSxHQUFVO0VBTi9CO1NBUUE7QUFaYTs7QUFlZixPQUFBO0VBQ0UsYUFERjtFQUVFLFlBRkYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBDIGZyb20gXCIuL2NvbnN0YW50c1wiXG5pbXBvcnQgKiBhcyBwdiBmcm9tIFwiLi9wdlwiXG5cblxuZ2V0Q29sb3JJbmRleCA9ICggciwgZywgYiApIC0+XG4gIChyIDw8ICgyICogQy5zaWdiaXRzKSkgKyAoZyA8PCBDLnNpZ2JpdHMpICsgYlxuXG4jIEhpc3RvZ3JhbSBpcyBhIDFEIGFycmF5LCBnaXZpbmcgdGhlIG51bWJlciBvZiBwaXhlbHMgaW4gZWFjaCBxdWFudGl6ZWQgcmVnaW9uXG5nZXRIaXN0b2dyYW0gPSAoIHBpeGVscyApIC0+XG4gIHNpemUgPSAxIDw8ICggMyAqIEMuc2lnYml0cyApXG4gIGhpc3RvZ3JhbSA9IG5ldyBBcnJheSBzaXplXG5cbiAgZm9yIHBpeGVsIGluIHBpeGVsc1xuICAgIHIgPSBwaXhlbFswXSA+PiBDLnJzaGlmdFxuICAgIGcgPSBwaXhlbFsxXSA+PiBDLnJzaGlmdFxuICAgIGIgPSBwaXhlbFsyXSA+PiBDLnJzaGlmdFxuICAgIGluZGV4ID0gZ2V0Q29sb3JJbmRleCByLCBnLCBiXG4gICAgY3VycmVudCA9IGhpc3RvZ3JhbVtpbmRleF0gPyAwXG4gICAgaGlzdG9ncmFtW2luZGV4XSA9IGN1cnJlbnQgKyAxXG5cbiAgaGlzdG9ncmFtXG5cblxuZXhwb3J0IHsgXG4gIGdldENvbG9ySW5kZXhcbiAgZ2V0SGlzdG9ncmFtXG59Il19
 //# sourceURL=/@dashkite/color-thief/src/histogram.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvY29sb3ItdGhpZWYvc3JjL2hpc3RvZ3JhbS5jb2ZmZWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQyBmcm9tIFwiLi9jb25zdGFudHNcIlxuaW1wb3J0ICogYXMgcHYgZnJvbSBcIi4vcHZcIlxuXG5cbmdldENvbG9ySW5kZXggPSAoIHIsIGcsIGIgKSAtPlxuICAociA8PCAoMiAqIEMuc2lnYml0cykpICsgKGcgPDwgQy5zaWdiaXRzKSArIGJcblxuIyBIaXN0b2dyYW0gaXMgYSAxRCBhcnJheSwgZ2l2aW5nIHRoZSBudW1iZXIgb2YgcGl4ZWxzIGluIGVhY2ggcXVhbnRpemVkIHJlZ2lvblxuZ2V0SGlzdG9ncmFtID0gKCBwaXhlbHMgKSAtPlxuICBzaXplID0gMSA8PCAoIDMgKiBDLnNpZ2JpdHMgKVxuICBoaXN0b2dyYW0gPSBuZXcgQXJyYXkgc2l6ZVxuXG4gIGZvciBwaXhlbCBpbiBwaXhlbHNcbiAgICByID0gcGl4ZWxbMF0gPj4gQy5yc2hpZnRcbiAgICBnID0gcGl4ZWxbMV0gPj4gQy5yc2hpZnRcbiAgICBiID0gcGl4ZWxbMl0gPj4gQy5yc2hpZnRcbiAgICBpbmRleCA9IGdldENvbG9ySW5kZXggciwgZywgYlxuICAgIGN1cnJlbnQgPSBoaXN0b2dyYW1baW5kZXhdID8gMFxuICAgIGhpc3RvZ3JhbVtpbmRleF0gPSBjdXJyZW50ICsgMVxuXG4gIGhpc3RvZ3JhbVxuXG5cbmV4cG9ydCB7IFxuICBnZXRDb2xvckluZGV4XG4gIGdldEhpc3RvZ3JhbVxufSJdLCJuYW1lcyI6WyJnZXRDb2xvckluZGV4IiwiZ2V0SGlzdG9ncmFtIiwiciIsImciLCJiIiwiQyIsInNpZ2JpdHMiLCJwaXhlbHMiLCJjdXJyZW50IiwiaGlzdG9ncmFtIiwiaSIsImluZGV4IiwibGVuIiwicGl4ZWwiLCJyZWYiLCJzaXplIiwiQXJyYXkiLCJsZW5ndGgiLCJyc2hpZnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBd0JFQSxhQURGO2VBQ0VBOztJQUNBQyxZQUZGO2VBRUVBOzs7bUVBekJGOzREQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFEQSxJQUFBRCxlQUFBQztBQUlBRCxnQkFBZ0IsU0FBRUUsQ0FBRixFQUFLQyxDQUFMLEVBQVFDLENBQVI7V0FDZCxBQUFDRixDQUFBQSxLQUFNLElBQUlHLFdBQUVDLE9BQVAsSUFBb0JILENBQUFBLEtBQUtFLFdBQUVDLE9BQVIsQUFBUSxJQUFXRjtBQUQ5Qjs7QUFJaEJILGVBQWUsU0FBRU0sTUFBRjtJQUNmLElBQUFILEdBQUFJLFNBQUFMLEdBQUFNLFdBQUFDLEdBQUFDLE9BQUFDLEtBQUFDLE9BQUFYLEdBQUFZLEtBQUFDO0lBQUVBLE9BQU8sS0FBTyxJQUFJVixXQUFFQyxPQUFSO0lBQ1pHLFlBQVksSUFBSU8sTUFBTUQ7SUFFdEIsSUFBQUwsSUFBQSxHQUFBRSxNQUFBTCxPQUFBVSxNQUFBLEVBQUFQLElBQUFFLEtBQUFGLElBQUE7O1FBQ0VSLElBQUlXLEtBQUssQ0FBQyxFQUFOLElBQVlSLFdBQUVhLE1BQUE7UUFDbEJmLElBQUlVLEtBQUssQ0FBQyxFQUFOLElBQVlSLFdBQUVhLE1BQUE7UUFDbEJkLElBQUlTLEtBQUssQ0FBQyxFQUFOLElBQVlSLFdBQUVhLE1BQUE7UUFDbEJQLFFBQVFYLGNBQWNFLEdBQUdDLEdBQUdDO1FBQzVCSSxVQUFBLEFBQUFNLENBQUFBLE1BQUFMLFNBQUEsQ0FBQUUsTUFBQSxLQUFBLE9BQUFHLE1BQTZCO1FBQzdCTCxTQUFTLENBQUNFLE1BQVYsR0FBbUJILFVBQVU7SUFOL0I7V0FRQUM7QUFaYSJ9