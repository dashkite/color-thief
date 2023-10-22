var extract, getColor, getPalette;
import * as Type from "@dashkite/joy/type";
import { CanvasImage } from "./canvas-image.js";
import { quantize } from "./quantize.js";
getColor = function (options) {
  if (options.colorCount == null) {
    options.colorCount = 5;
  }
  return getPalette(options)[0];
};
getPalette = function (options) {
  if (options.colorCount == null) {
    options.colorCount = 10;
  }
  if (options.quality == null) {
    options.quality = 10;
  }
  return extract(options);
};
extract = function (options) {
  var a, allowWhite, b, colorMap, doesPass, g, i, j, offset, pixels, r, rawPixels, ref, ref1, ref2;
  if (!CanvasImage.isType(options.source)) {
    throw new Error("options.source must be instance of color-thief CanvasImage");
  }
  options.colorCount = Math.round(options.colorCount);
  if (Type.isNaN(options.colorCount) || !(1 < (ref = options.colorCount) && ref < 256)) {
    throw new Error("options.colorCount must be an integer between 2 and 255 inclusive");
  }
  options.quality = Math.round(options.quality);
  if (Type.isNaN(options.quality) || !(0 < options.quality)) {
    throw new Error("options.quality must be an integer greater than 0");
  }
  if (options.allowWhite === true) {
    // We need to remove any pixels beyond sRGB?
    doesPass = function (r, g, b) {
      return !(r > 255 && g > 255 && b > 255);
    };
  } else {
    // Filter out pixels that are too close to white rgb(255, 255, 255)
    doesPass = function (r, g, b) {
      return !(r > 250 && g > 250 && b > 250);
    };
  }
  // Canvas stores pixel data in a 1D array. Reformat for quantize function.
  rawPixels = options.source.pixels;
  allowWhite = options.allowWhite;
  pixels = [];
  for (i = j = 0, ref1 = options.source.pixelCount, ref2 = options.quality; ref2 !== 0 && (ref2 > 0 ? j < ref1 : j > ref1); i = j += ref2) {
    offset = i * 4;
    r = rawPixels[offset + 0];
    g = rawPixels[offset + 1];
    b = rawPixels[offset + 2];
    a = rawPixels[offset + 3];
    if (a < 125) {
      // Filter transparent pixels
      continue;
    }
    // Filter out pixels that are too light
    if (doesPass(r, g, b) === true) {
      pixels.push([r, g, b]);
    }
  }
  // Final check on new pixel array
  if (pixels.length === 0) {
    return [];
  }
  // quantize clusters values using median cut algorithm
  // # TODO: we should throw here, but I have a weird Svelte issue.
  // throw new Error "quantize pixel array cannot have lenth 0"
  colorMap = quantize(pixels, options.colorCount);
  return colorMap.palette();
};
export { CanvasImage, getColor, getPalette, extract };