var applyMedianCut, cutVBox, getAxialSum;
import * as C from "./constants.js";
import * as pv from "./pv.js";
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
applyMedianCut = function (histogram, vbox) {
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
export { applyMedianCut };