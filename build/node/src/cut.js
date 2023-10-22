"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyMedianCut = void 0;
var C = _interopRequireWildcard(require("./constants.js"));
var pv = _interopRequireWildcard(require("./pv.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var applyMedianCut, cutVBox, getAxialSum;
getAxialSum = function (histogram, vbox) {
  var axis, bw, getColorIndex, gw, i, index, j, k, l, len, lookAheadSums, m, maxw, n, o, partial, partialSums, ref, ref1, ref2, ref3, ref4, ref5, rw, sum, total, x1, x2, y1, y2, z1, z2;
  rw = vbox.r2 - vbox.r1 + 1;
  gw = vbox.g2 - vbox.g1 + 1;
  bw = vbox.b2 - vbox.b1 + 1;
  maxw = pv.max([rw, gw, bw]);
  if (rw === maxw) {
    axis = "r";
    x1 = vbox.r1;
    x2 = vbox.r2;
    y1 = vbox.g1;
    y2 = vbox.g2;
    z1 = vbox.b1;
    z2 = vbox.b2;
    getColorIndex = function (r, g, b) {
      return (r << 2 * C.sigbits) + (g << C.sigbits) + b;
    };
  } else if (gw === maxw) {
    axis = "g";
    x1 = vbox.g1;
    x2 = vbox.g2;
    y1 = vbox.r1;
    y2 = vbox.r2;
    z1 = vbox.b1;
    z2 = vbox.b2;
    getColorIndex = function (g, r, b) {
      return (r << 2 * C.sigbits) + (g << C.sigbits) + b;
    };
  } else {
    axis = "b";
    x1 = vbox.b1;
    x2 = vbox.b2;
    y1 = vbox.r1;
    y2 = vbox.r2;
    z1 = vbox.g1;
    z2 = vbox.g2;
    getColorIndex = function (b, r, g) {
      return (r << 2 * C.sigbits) + (g << C.sigbits) + b;
    };
  }
  total = 0;
  partialSums = [];
  lookAheadSums = [];
  for (i = l = ref = x1, ref1 = x2; ref <= ref1 ? l <= ref1 : l >= ref1; i = ref <= ref1 ? ++l : --l) {
    if (!(x1 <= x2)) {
      continue;
    }
    sum = 0;
    for (j = m = ref2 = y1, ref3 = y2; ref2 <= ref3 ? m <= ref3 : m >= ref3; j = ref2 <= ref3 ? ++m : --m) {
      if (y1 <= y2) {
        for (k = n = ref4 = z1, ref5 = z2; ref4 <= ref5 ? n <= ref5 : n >= ref5; k = ref4 <= ref5 ? ++n : --n) {
          if (!(z1 <= z2)) {
            continue;
          }
          index = getColorIndex(i, j, k);
          sum += histogram[index] || 0;
        }
      }
    }
    total += sum;
    partialSums[i] = total;
  }
  for (o = 0, len = partialSums.length; o < len; o++) {
    partial = partialSums[o];
    lookAheadSums.push(total - partial);
  }
  return {
    vbox,
    axis,
    total,
    partialSums,
    lookAheadSums
  };
};
cutVBox = function (axialSum) {
  var axis, count, d1, d2, halfTotal, i, index, l, left, lookAheadSums, partialSums, ref, ref1, right, total, vbox, vbox1, vbox2, x, y;
  ({
    vbox,
    axis,
    total,
    partialSums,
    lookAheadSums
  } = axialSum);
  d1 = axis + "1";
  d2 = axis + "2";
  x = vbox[d1];
  y = vbox[d2];
  halfTotal = total / 2;
  for (i = l = ref = x, ref1 = y; ref <= ref1 ? l <= ref1 : l >= ref1; i = ref <= ref1 ? ++l : --l) {
    if (!(x <= y)) {
      continue;
    }
    if (partialSums[i] <= halfTotal) {
      continue;
    }
    vbox1 = vbox.copy();
    vbox2 = vbox.copy();
    left = i - vbox[d1];
    right = vbox[d2] - i;
    if (left <= right) {
      index = Math.min(vbox[d2] - 1, ~~(i + right / 2));
    } else {
      index = Math.max(vbox[d1], ~~(i - 1 - left / 2));
    }
    while (!partialSums[index]) {
      index++;
    }
    count = lookAheadSums[index];
    while (!count && partialSums[index - 1]) {
      count = lookAheadSums[--index];
    }

    // set dimensions
    vbox1[d2] = index;
    vbox2[d1] = vbox1[d2] + 1;
    return [vbox1, vbox2];
  }
};
exports.applyMedianCut = applyMedianCut = function (histogram, vbox) {
  if (!vbox.count()) {
    return;
  }
  // If only one pixel, don't split
  if (vbox.count() === 1) {
    return [vbox.copy()];
  }
  // split - returns an array of two vboxes
  return cutVBox(getAxialSum(histogram, vbox));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jdXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBLGNBQUEsRUFBQSxPQUFBLEVBQUEsV0FBQTtBQUlBLFdBQUEsR0FBYyxTQUFBLENBQUUsU0FBRixFQUFhLElBQWIsRUFBQTtFQUNkLElBQUEsSUFBQSxFQUFBLEVBQUEsRUFBQSxhQUFBLEVBQUEsRUFBQSxFQUFBLENBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLGFBQUEsRUFBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxFQUFBLEVBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7RUFBRSxFQUFBLEdBQUssSUFBSSxDQUFDLEVBQUwsR0FBVSxJQUFJLENBQUMsRUFBZixHQUFvQixDQUFBO0VBQ3pCLEVBQUEsR0FBSyxJQUFJLENBQUMsRUFBTCxHQUFVLElBQUksQ0FBQyxFQUFmLEdBQW9CLENBQUE7RUFDekIsRUFBQSxHQUFLLElBQUksQ0FBQyxFQUFMLEdBQVUsSUFBSSxDQUFDLEVBQWYsR0FBb0IsQ0FBQTtFQUN6QixJQUFBLEdBQU8sRUFBRSxDQUFDLEdBQUgsQ0FBTyxDQUFFLEVBQUYsRUFBTSxFQUFOLEVBQVUsRUFBVixDQUFQLENBQUE7RUFFUCxJQUFHLEVBQUEsS0FBTSxJQUFULEVBQUE7SUFDRSxJQUFBLEdBQU8sR0FBQTtJQUNQLEVBQUEsR0FBSyxJQUFJLENBQUMsRUFBQTtJQUNWLEVBQUEsR0FBSyxJQUFJLENBQUMsRUFBQTtJQUNWLEVBQUEsR0FBSyxJQUFJLENBQUMsRUFBQTtJQUNWLEVBQUEsR0FBSyxJQUFJLENBQUMsRUFBQTtJQUNWLEVBQUEsR0FBSyxJQUFJLENBQUMsRUFBQTtJQUNWLEVBQUEsR0FBSyxJQUFJLENBQUMsRUFBQTtJQUNWLGFBQUEsR0FBZ0IsU0FBQSxDQUFFLENBQUYsRUFBSyxDQUFMLEVBQVEsQ0FBUixFQUFBO2FBQ2QsQ0FBQyxDQUFBLElBQU0sQ0FBQSxHQUFJLENBQUMsQ0FBTixPQUFOLEtBQTBCLENBQUEsSUFBSyxDQUFDLENBQUMsT0FBUixDQUF6QixHQUE0QyxDQUFBO0lBRDlCLENBUmxCO0dBQUEsTUFVSyxJQUFHLEVBQUEsS0FBTSxJQUFULEVBQUE7SUFDSCxJQUFBLEdBQU8sR0FBQTtJQUNQLEVBQUEsR0FBSyxJQUFJLENBQUMsRUFBQTtJQUNWLEVBQUEsR0FBSyxJQUFJLENBQUMsRUFBQTtJQUNWLEVBQUEsR0FBSyxJQUFJLENBQUMsRUFBQTtJQUNWLEVBQUEsR0FBSyxJQUFJLENBQUMsRUFBQTtJQUNWLEVBQUEsR0FBSyxJQUFJLENBQUMsRUFBQTtJQUNWLEVBQUEsR0FBSyxJQUFJLENBQUMsRUFBQTtJQUNWLGFBQUEsR0FBZ0IsU0FBQSxDQUFFLENBQUYsRUFBSyxDQUFMLEVBQVEsQ0FBUixFQUFBO2FBQ2QsQ0FBQyxDQUFBLElBQU0sQ0FBQSxHQUFJLENBQUMsQ0FBTixPQUFOLEtBQTBCLENBQUEsSUFBSyxDQUFDLENBQUMsT0FBUixDQUF6QixHQUE0QyxDQUFBO0lBRDlCLENBUmI7R0FBQSxNQUFBO0lBV0gsSUFBQSxHQUFPLEdBQUE7SUFDUCxFQUFBLEdBQUssSUFBSSxDQUFDLEVBQUE7SUFDVixFQUFBLEdBQUssSUFBSSxDQUFDLEVBQUE7SUFDVixFQUFBLEdBQUssSUFBSSxDQUFDLEVBQUE7SUFDVixFQUFBLEdBQUssSUFBSSxDQUFDLEVBQUE7SUFDVixFQUFBLEdBQUssSUFBSSxDQUFDLEVBQUE7SUFDVixFQUFBLEdBQUssSUFBSSxDQUFDLEVBQUE7SUFDVixhQUFBLEdBQWdCLFNBQUEsQ0FBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVIsRUFBQTthQUNkLENB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ZCxLQUFLLENBQUUsRUFBRixDQUFMLEdBQWMsS0FBSyxDQUFFLEVBQUYsQ0FBTCxHQUFjLENBQUE7SUFDNUIsT0FBTyxDQUFFLEtBQUYsRUFBUyxLQUFULENBQUE7RUF2QlQ7QUFUUSxDQUFBO0FBbUNWLE9BQUEsQ0FBQSxjQUFBLEdBQUEsY0FBQSxHQUFpQixTQUFBLENBQUUsU0FBRixFQUFhLElBQWIsRUFBQTtFQUNmLElBQUcsQ0FBQyxJQUFJLENBQUMsS0FBTCxDQUFBLENBQUosRUFBQTtJQUFBO0VBQUY7O0VBSUUsSUFBRyxJQUFJLENBQUMsS0FBTCxDQUFBLENBQUEsS0FBZ0IsQ0FBbkIsRUFBQTtJQUNFLE9BQU8sQ0FBRSxJQUFJLENBQUMsSUFBTCxDQUFBLENBQUYsQ0FEVDtFQUpGOztTQVFFLE9BQUEsQ0FBUSxXQUFBLENBQVksU0FBWixFQUF1QixJQUF2QixDQUFSLENBQUE7QUFUZSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQyBmcm9tIFwiLi9jb25zdGFudHNcIlxuaW1wb3J0ICogYXMgcHYgZnJvbSBcIi4vcHZcIlxuXG5cbmdldEF4aWFsU3VtID0gKCBoaXN0b2dyYW0sIHZib3ggKSAtPlxuICBydyA9IHZib3gucjIgLSB2Ym94LnIxICsgMVxuICBndyA9IHZib3guZzIgLSB2Ym94LmcxICsgMVxuICBidyA9IHZib3guYjIgLSB2Ym94LmIxICsgMVxuICBtYXh3ID0gcHYubWF4IFsgcncsIGd3LCBidyBdXG5cbiAgaWYgcncgPT0gbWF4d1xuICAgIGF4aXMgPSBcInJcIlxuICAgIHgxID0gdmJveC5yMVxuICAgIHgyID0gdmJveC5yMlxuICAgIHkxID0gdmJveC5nMVxuICAgIHkyID0gdmJveC5nMlxuICAgIHoxID0gdmJveC5iMVxuICAgIHoyID0gdmJveC5iMlxuICAgIGdldENvbG9ySW5kZXggPSAoIHIsIGcsIGIgKSAtPlxuICAgICAgKHIgPDwgKDIgKiBDLnNpZ2JpdHMpKSArIChnIDw8IEMuc2lnYml0cykgKyBiXG4gIGVsc2UgaWYgZ3cgPT0gbWF4d1xuICAgIGF4aXMgPSBcImdcIlxuICAgIHgxID0gdmJveC5nMVxuICAgIHgyID0gdmJveC5nMlxuICAgIHkxID0gdmJveC5yMVxuICAgIHkyID0gdmJveC5yMiBcbiAgICB6MSA9IHZib3guYjFcbiAgICB6MiA9IHZib3guYjJcbiAgICBnZXRDb2xvckluZGV4ID0gKCBnLCByLCBiICkgLT5cbiAgICAgIChyIDw8ICgyICogQy5zaWdiaXRzKSkgKyAoZyA8PCBDLnNpZ2JpdHMpICsgYlxuICBlbHNlXG4gICAgYXhpcyA9IFwiYlwiXG4gICAgeDEgPSB2Ym94LmIxXG4gICAgeDIgPSB2Ym94LmIyXG4gICAgeTEgPSB2Ym94LnIxXG4gICAgeTIgPSB2Ym94LnIyXG4gICAgejEgPSB2Ym94LmcxXG4gICAgejIgPSB2Ym94LmcyXG4gICAgZ2V0Q29sb3JJbmRleCA9ICggYiwgciwgZyApIC0+XG4gICAgICAociA8PCAoMiAqIEMuc2lnYml0cykpICsgKGcgPDwgQy5zaWdiaXRzKSArIGJcbiAgXG4gIHRvdGFsID0gMFxuICBwYXJ0aWFsU3VtcyA9IFtdXG4gIGxvb2tBaGVhZFN1bXMgPSBbXVxuXG4gIGZvciBpIGluIFsgeDEgLi4geDIgXSB3aGVuIHgxIDw9IHgyXG4gICAgc3VtID0gMFxuICAgIGZvciBqIGluIFsgeTEgLi4geTIgXSB3aGVuIHkxIDw9IHkyXG4gICAgICBmb3IgayBpbiBbIHoxIC4uIHoyIF0gd2hlbiB6MSA8PSB6MlxuICAgICAgICBpbmRleCA9IGdldENvbG9ySW5kZXggaSwgaiwga1xuICAgICAgICBzdW0gKz0gaGlzdG9ncmFtWyBpbmRleCBdIHx8IDBcblxuICAgIHRvdGFsICs9IHN1bVxuICAgIHBhcnRpYWxTdW1zW2ldID0gdG90YWxcblxuICBmb3IgcGFydGlhbCBpbiBwYXJ0aWFsU3Vtc1xuICAgIGxvb2tBaGVhZFN1bXMucHVzaCB0b3RhbCAtIHBhcnRpYWxcblxuICB7XG4gICAgdmJveFxuICAgIGF4aXNcbiAgICB0b3RhbFxuICAgIHBhcnRpYWxTdW1zXG4gICAgbG9va0FoZWFkU3Vtc1xuICB9XG5cblxuXG5jdXRWQm94ID0gKCBheGlhbFN1bSApIC0+XG4gIHsgdmJveCwgYXhpcywgdG90YWwsIHBhcnRpYWxTdW1zLCBsb29rQWhlYWRTdW1zIH0gPSBheGlhbFN1bVxuICBkMSA9IGF4aXMgKyBcIjFcIlxuICBkMiA9IGF4aXMgKyBcIjJcIlxuICB4ID0gdmJveFtkMV1cbiAgeSA9IHZib3hbZDJdXG4gIGhhbGZUb3RhbCA9IHRvdGFsIC8gMlxuXG5cbiAgZm9yIGkgaW4gWyB4IC4uIHkgXSB3aGVuIHggPD0geVxuICAgIGNvbnRpbnVlIGlmIHBhcnRpYWxTdW1zW2ldIDw9IGhhbGZUb3RhbFxuXG4gICAgdmJveDEgPSB2Ym94LmNvcHkoKVxuICAgIHZib3gyID0gdmJveC5jb3B5KClcbiAgICBsZWZ0ID0gaSAtIHZib3hbIGQxIF1cbiAgICByaWdodCA9IHZib3hbIGQyIF0gLSBpXG4gICAgaWYgbGVmdCA8PSByaWdodFxuICAgICAgaW5kZXggPSBNYXRoLm1pbiB2Ym94W2QyXSAtIDEsIH5+KGkgKyByaWdodCAvIDIpXG4gICAgZWxzZSBcbiAgICAgIGluZGV4ID0gTWF0aC5tYXggdmJveFtkMV0sIH5+KGkgLSAxIC0gbGVmdCAvIDIpXG4gICAgXG4gICAgIyBhdm9pZCAwLWNvdW50IGJveGVzXG4gICAgd2hpbGUgIXBhcnRpYWxTdW1zWyBpbmRleCBdXG4gICAgICBpbmRleCsrXG5cbiAgICBjb3VudCA9IGxvb2tBaGVhZFN1bXNbIGluZGV4IF1cbiAgICB3aGlsZSAhY291bnQgJiYgcGFydGlhbFN1bXNbIGluZGV4IC0gMSBdXG4gICAgICBjb3VudCA9IGxvb2tBaGVhZFN1bXNbIC0taW5kZXggXVxuICAgIFxuICAgICMgc2V0IGRpbWVuc2lvbnNcbiAgICB2Ym94MVsgZDIgXSA9IGluZGV4XG4gICAgdmJveDJbIGQxIF0gPSB2Ym94MVsgZDIgXSArIDEgIFxuICAgIHJldHVybiBbIHZib3gxLCB2Ym94MiBdICAgICAgICAgICAgICAgXG5cblxuYXBwbHlNZWRpYW5DdXQgPSAoIGhpc3RvZ3JhbSwgdmJveCApIC0+XG4gIGlmICF2Ym94LmNvdW50KCkgXG4gICAgcmV0dXJuXG5cbiAgIyBJZiBvbmx5IG9uZSBwaXhlbCwgZG9uJ3Qgc3BsaXRcbiAgaWYgdmJveC5jb3VudCgpID09IDFcbiAgICByZXR1cm4gWyB2Ym94LmNvcHkoKSBdXG5cbiAgIyBzcGxpdCAtIHJldHVybnMgYW4gYXJyYXkgb2YgdHdvIHZib3hlc1xuICBjdXRWQm94IGdldEF4aWFsU3VtIGhpc3RvZ3JhbSwgdmJveFxuXG5cbmV4cG9ydCB7IGFwcGx5TWVkaWFuQ3V0IH0iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=src/cut.coffee