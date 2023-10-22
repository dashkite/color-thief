"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHistogram = exports.getColorIndex = void 0;
var C = _interopRequireWildcard(require("./constants.js"));
var pv = _interopRequireWildcard(require("./pv.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var getColorIndex, getHistogram;
exports.getColorIndex = getColorIndex = function (r, g, b) {
  return (r << 2 * C.sigbits) + (g << C.sigbits) + b;
};

// Histogram is a 1D array, giving the number of pixels in each quantized region
exports.getHistogram = getHistogram = function (pixels) {
  var b, current, g, histogram, i, index, len, pixel, r, ref, size;
  size = 1 << 3 * C.sigbits;
  histogram = new Array(size);
  for (i = 0, len = pixels.length; i < len; i++) {
    pixel = pixels[i];
    r = pixel[0] >> C.rshift;
    g = pixel[1] >> C.rshift;
    b = pixel[2] >> C.rshift;
    index = getColorIndex(r, g, b);
    current = (ref = histogram[index]) != null ? ref : 0;
    histogram[index] = current + 1;
  }
  return histogram;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9oaXN0b2dyYW0uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBLGFBQUEsRUFBQSxZQUFBO0FBSUEsT0FBQSxDQUFBLGFBQUEsR0FBQSxhQUFBLEdBQWdCLFNBQUEsQ0FBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVIsRUFBQTtTQUNkLENBQUMsQ0FBQSxJQUFNLENBQUEsR0FBSSxDQUFDLENBQU4sT0FBTixLQUEwQixDQUFBLElBQUssQ0FBQyxDQUFDLE9BQVIsQ0FBekIsR0FBNEMsQ0FBQTtBQUQ5QixDQUpoQjs7O0FBUUEsT0FBQSxDQUFBLFlBQUEsR0FBQSxZQUFBLEdBQWUsU0FBQSxDQUFFLE1BQUYsRUFBQTtFQUNmLElBQUEsQ0FBQSxFQUFBLE9BQUEsRUFBQSxDQUFBLEVBQUEsU0FBQSxFQUFBLENBQUEsRUFBQSxLQUFBLEVBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLElBQUE7RUFBRSxJQUFBLEdBQU8sQ0FBQSxJQUFPLENBQUEsR0FBSSxDQUFDLENBQVAsT0FBQTtFQUNaLFNBQUEsR0FBWSxJQUFJLEtBQUosQ0FBVSxJQUFWLENBQUE7RUFFWixLQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsR0FBQSxHQUFBLE1BQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxHQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTs7SUFDRSxDQUFBLEdBQUksS0FBSyxDQUFDLENBQUQsQ0FBTCxJQUFZLENBQUMsQ0FBQyxNQUFBO0lBQ2xCLENBQUEsR0FBSSxLQUFLLENBQUMsQ0FBRCxDQUFMLElBQVksQ0FBQyxDQUFDLE1BQUE7SUFDbEIsQ0FBQSxHQUFJLEtBQUssQ0FBQyxDQUFELENBQUwsSUFBWSxDQUFDLENBQUMsTUFBQTtJQUNsQixLQUFBLEdBQVEsYUFBQSxDQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsQ0FBQTtJQUNSLE9BQUEsR0FBQSxDQUFBLEdBQUEsR0FBQSxTQUFBLENBQUEsS0FBQSxDQUFBLEtBQUEsSUFBQSxHQUFBLEdBQUEsR0FBNkIsQ0FBQTtJQUM3QixTQUFTLENBQUMsS0FBRCxDQUFULEdBQW1CLE9BQUEsR0FBVSxDQUFBO0VBTi9CO1NBUUEsU0FBQTtBQVphLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBDIGZyb20gXCIuL2NvbnN0YW50c1wiXG5pbXBvcnQgKiBhcyBwdiBmcm9tIFwiLi9wdlwiXG5cblxuZ2V0Q29sb3JJbmRleCA9ICggciwgZywgYiApIC0+XG4gIChyIDw8ICgyICogQy5zaWdiaXRzKSkgKyAoZyA8PCBDLnNpZ2JpdHMpICsgYlxuXG4jIEhpc3RvZ3JhbSBpcyBhIDFEIGFycmF5LCBnaXZpbmcgdGhlIG51bWJlciBvZiBwaXhlbHMgaW4gZWFjaCBxdWFudGl6ZWQgcmVnaW9uXG5nZXRIaXN0b2dyYW0gPSAoIHBpeGVscyApIC0+XG4gIHNpemUgPSAxIDw8ICggMyAqIEMuc2lnYml0cyApXG4gIGhpc3RvZ3JhbSA9IG5ldyBBcnJheSBzaXplXG5cbiAgZm9yIHBpeGVsIGluIHBpeGVsc1xuICAgIHIgPSBwaXhlbFswXSA+PiBDLnJzaGlmdFxuICAgIGcgPSBwaXhlbFsxXSA+PiBDLnJzaGlmdFxuICAgIGIgPSBwaXhlbFsyXSA+PiBDLnJzaGlmdFxuICAgIGluZGV4ID0gZ2V0Q29sb3JJbmRleCByLCBnLCBiXG4gICAgY3VycmVudCA9IGhpc3RvZ3JhbVtpbmRleF0gPyAwXG4gICAgaGlzdG9ncmFtW2luZGV4XSA9IGN1cnJlbnQgKyAxXG5cbiAgaGlzdG9ncmFtXG5cblxuZXhwb3J0IHsgXG4gIGdldENvbG9ySW5kZXhcbiAgZ2V0SGlzdG9ncmFtXG59Il0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=src/histogram.coffee