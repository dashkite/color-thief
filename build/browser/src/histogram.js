var getColorIndex, getHistogram;
import * as C from "./constants.js";
import * as pv from "./pv.js";
getColorIndex = function (r, g, b) {
  return (r << 2 * C.sigbits) + (g << C.sigbits) + b;
};

// Histogram is a 1D array, giving the number of pixels in each quantized region
getHistogram = function (pixels) {
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
export { getColorIndex, getHistogram };