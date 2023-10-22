var VBox;
import * as Type from "@dashkite/joy/type";
import * as C from "./constants.js";
import { getColorIndex } from "./histogram.js";
VBox = function () {
  // 3d color space box
  class VBox {
    constructor({
      r1: r11,
      r2: r21,
      g1: g11,
      g2: g21,
      b1: b11,
      b2: b21,
      histogram: histogram1
    }) {
      this.r1 = r11;
      this.r2 = r21;
      this.g1 = g11;
      this.g2 = g21;
      this.b1 = b11;
      this.b2 = b21;
      this.histogram = histogram1;
    }
    static create({
      r1,
      r2,
      g1,
      g2,
      b1,
      b2,
      histogram
    }) {
      return new VBox({
        r1,
        r2,
        g1,
        g2,
        b1,
        b2,
        histogram
      });
    }
    static fromPixels(pixels, histogram) {
      var b, b1, b2, g, g1, g2, l, len, pixel, r, r1, r2;
      r1 = g1 = b1 = 1e6;
      r2 = g2 = b2 = 0;
      for (l = 0, len = pixels.length; l < len; l++) {
        pixel = pixels[l];
        r = pixel[0] >> C.rshift;
        g = pixel[1] >> C.rshift;
        b = pixel[2] >> C.rshift;
        if (r < r1) {
          r1 = r;
        } else if (r > r2) {
          r2 = r;
        }
        if (g < g1) {
          g1 = g;
        } else if (g > g2) {
          g2 = g;
        }
        if (b < b1) {
          b1 = b;
        } else if (b > b2) {
          b2 = b;
        }
      }
      return VBox.create({
        r1,
        r2,
        g1,
        g2,
        b1,
        b2,
        histogram
      });
    }
    copy() {
      return VBox.create(this);
    }
    volume(force) {
      if (force === true || this._volume == null) {
        this._volume = (this.r2 - this.r1 + 1) * (this.g2 - this.g1 + 1) * (this.b2 - this.b1 + 1);
      }
      return this._volume;
    }
    count(force) {
      var count, i, index, j, k, l, m, n, ref, ref1, ref2, ref3, ref4, ref5;
      if (force === true || this._count == null) {
        count = 0;
        for (i = l = ref = this.r1, ref1 = this.r2; ref <= ref1 ? l <= ref1 : l >= ref1; i = ref <= ref1 ? ++l : --l) {
          if (this.r1 <= this.r2) {
            for (j = m = ref2 = this.g1, ref3 = this.g2; ref2 <= ref3 ? m <= ref3 : m >= ref3; j = ref2 <= ref3 ? ++m : --m) {
              if (this.g1 <= this.g2) {
                for (k = n = ref4 = this.b1, ref5 = this.b2; ref4 <= ref5 ? n <= ref5 : n >= ref5; k = ref4 <= ref5 ? ++n : --n) {
                  if (!(this.b1 <= this.b2)) {
                    continue;
                  }
                  index = getColorIndex(i, j, k);
                  count += this.histogram[index] || 0;
                }
              }
            }
          }
        }
        this._count = count;
      }
      return this._count;
    }
    avg(force) {
      var bSum, gSum, i, index, j, k, l, m, mult, n, rSum, ref, ref1, ref2, ref3, ref4, ref5, total, value;
      if (force === true || this._avg == null) {
        total = rSum = gSum = bSum = 0;
        mult = 1 << 8 - C.sigbits;
        for (i = l = ref = this.r1, ref1 = this.r2; ref <= ref1 ? l <= ref1 : l >= ref1; i = ref <= ref1 ? ++l : --l) {
          if (this.r1 <= this.r2) {
            for (j = m = ref2 = this.g1, ref3 = this.g2; ref2 <= ref3 ? m <= ref3 : m >= ref3; j = ref2 <= ref3 ? ++m : --m) {
              if (this.g1 <= this.g2) {
                for (k = n = ref4 = this.b1, ref5 = this.b2; ref4 <= ref5 ? n <= ref5 : n >= ref5; k = ref4 <= ref5 ? ++n : --n) {
                  if (!(this.b1 <= this.b2)) {
                    continue;
                  }
                  index = getColorIndex(i, j, k);
                  value = this.histogram[index] || 0;
                  total += value;
                  rSum += value * (i + 0.5) * mult;
                  gSum += value * (j + 0.5) * mult;
                  bSum += value * (k + 0.5) * mult;
                }
              }
            }
          }
        }
        if (total) {
          this._avg = [~~(rSum / total), ~~(gSum / total), ~~(bSum / total)];
        } else {
          this._avg = [~~(mult * (this.r1 + this.r2 + 1) / 2), ~~(mult * (this.g1 + this.g2 + 1) / 2), ~~(mult * (this.b1 + this.b2 + 1) / 2)];
        }
      }
      return this._avg;
    }
    contains(pixel) {
      var b, g, r;
      r = pixel[0] >> C.rshift;
      g = pixel[1] >> C.rshift;
      b = pixel[2] >> C.rshift;
      return this.r1 <= r && r <= this.r2 && this.g1 <= g && g <= this.g2 && this.b1 <= b && b <= this.b2;
    }
  }
  ;
  VBox.isType = Type.isType(VBox);
  return VBox;
}.call(this);
export { VBox };