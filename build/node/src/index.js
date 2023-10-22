"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CanvasImage", {
  enumerable: true,
  get: function () {
    return _canvasImage.CanvasImage;
  }
});
exports.getPalette = exports.getColor = exports.extract = void 0;
var Type = _interopRequireWildcard(require("@dashkite/joy/type"));
var _canvasImage = require("./canvas-image.js");
var _quantize = require("./quantize.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var extract, getColor, getPalette;
exports.getColor = getColor = function (options) {
  if (options.colorCount == null) {
    options.colorCount = 5;
  }
  return getPalette(options)[0];
};
exports.getPalette = getPalette = function (options) {
  if (options.colorCount == null) {
    options.colorCount = 10;
  }
  if (options.quality == null) {
    options.quality = 10;
  }
  return extract(options);
};
exports.extract = extract = function (options) {
  var a, allowWhite, b, colorMap, doesPass, g, i, j, offset, pixels, r, rawPixels, ref, ref1, ref2;
  if (!_canvasImage.CanvasImage.isType(options.source)) {
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
  colorMap = (0, _quantize.quantize)(pixels, options.colorCount);
  return colorMap.palette();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQSxJQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBO0FBQUEsSUFBQSxZQUFBLEdBQUEsT0FBQTtBQUFBLElBQUEsU0FBQSxHQUFBLE9BQUE7QUFBQSxTQUFBLHlCQUFBLENBQUEsNkJBQUEsT0FBQSxtQkFBQSxDQUFBLE9BQUEsT0FBQSxJQUFBLENBQUEsT0FBQSxPQUFBLFlBQUEsd0JBQUEsWUFBQSxDQUFBLENBQUEsV0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxDQUFBO0FBQUEsU0FBQSx3QkFBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLFVBQUEsU0FBQSxDQUFBLGVBQUEsQ0FBQSx1QkFBQSxDQUFBLHlCQUFBLENBQUEsV0FBQSxPQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSx3QkFBQSxDQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxLQUFBLFNBQUEsVUFBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLGNBQUEsSUFBQSxNQUFBLENBQUEsd0JBQUEsV0FBQSxDQUFBLElBQUEsQ0FBQSxvQkFBQSxDQUFBLElBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLFNBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsd0JBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxVQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLFlBQUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsSUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLFVBQUE7QUFLQSxPQUFBLENBQUEsUUFBQSxHQUFBLFFBQUEsR0FBVyxTQUFBLENBQUUsT0FBRixFQUFBOztJQUNULE9BQU8sQ0FBQyxVQUFBLEdBQWMsQ0FBQTs7RUFDdEIsT0FBRSxVQUFBLENBQVcsT0FBWCxDQUFGLENBQXdCLENBQUYsQ0FBQTtBQUZiLENBQUE7QUFLWCxPQUFBLENBQUEsVUFBQSxHQUFBLFVBQUEsR0FBYSxTQUFBLENBQUUsT0FBRixFQUFBOztJQUNYLE9BQU8sQ0FBQyxVQUFBLEdBQWMsRUFBQTs7O0lBQ3RCLE9BQU8sQ0FBQyxPQUFBLEdBQVcsRUFBQTs7U0FDbkIsT0FBQSxDQUFRLE9BQVIsQ0FBQTtBQUhXLENBQUE7QUFNYixPQUFBLENBQUEsT0FBQSxHQUFBLE9BQUEsR0FBVSxTQUFBLENBQUUsT0FBRixFQUFBO0VBQ1YsSUFBQSxDQUFBLEVBQUEsVUFBQSxFQUFBLENBQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLFNBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLElBQUE7RUFBRSxJQUFHLENBQUUsd0JBQVcsQ0FBQyxNQUFaLENBQW1CLE9BQU8sQ0FBQyxNQUEzQixDQUFMLEVBQUE7SUFDRSxNQUFNLElBQUksS0FBSixDQUFVLDREQUFWLENBRFI7O0VBR0EsT0FBTyxDQUFDLFVBQVIsR0FBcUIsSUFBSSxDQUFDLEtBQUwsQ0FBVyxPQUFPLENBQUMsVUFBbkIsQ0FBQTtFQUNyQixJQUFJLElBQUksQ0FBQyxLQUFMLENBQVcsT0FBTyxDQUFDLFVBQW5CLENBQUQsSUFBbUMsRUFBRSxDQUFBLElBQUEsR0FBQSxHQUFJLE9BQU8sQ0FBQyxVQUFBLENBQVosSUFBQSxHQUFBLEdBQXlCLEdBQTFCLENBQXZDLEVBQUE7SUFDRSxNQUFNLElBQUksS0FBSixDQUFVLG1FQUFWLENBRFI7O0VBR0EsT0FBTyxDQUFDLE9BQVIsR0FBa0IsSUFBSSxDQUFDLEtBQUwsQ0FBVyxPQUFPLENBQUMsT0FBbkIsQ0FBQTtFQUNsQixJQUFJLElBQUksQ0FBQyxLQUFMLENBQVcsT0FBTyxDQUFDLE9BQW5CLENBQUQsSUFBZ0MsRUFBRSxDQUFBLEdBQUksT0FBTyxDQUFDLE9BQWIsQ0FBcEMsRUFBQTtJQUNFLE1BQU0sSUFBSSxLQUFKLENBQVUsbURBQVYsQ0FEUjs7RUFHQSxJQUFHLE9BQU8sQ0FBQyxVQUFSLEtBQXNCLElBQXpCLEVBQUE7O0lBRUUsUUFBQSxHQUFXLFNBQUEsQ0FBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVIsRUFBQTthQUFlLEVBQUUsQ0FBQSxHQUFJLEdBQUosSUFBVyxDQUFBLEdBQUksR0FBZixJQUFzQixDQUFBLEdBQUksR0FBM0IsQ0FBQTtJQUFoQixDQUZiO0dBQUEsTUFBQTs7SUFLRSxRQUFBLEdBQVcsU0FBQSxDQUFFLENBQUYsRUFBSyxDQUFMLEVBQVEsQ0FBUixFQUFBO2FBQWUsRUFBRSxDQUFBLEdBQUksR0FBSixJQUFXLENBQUEsR0FBSSxHQUFmLElBQXNCLENBQUEsR0FBSSxHQUEzQixDQUFBO0lBQWhCLENBTGI7RUFYRjs7RUFvQkUsU0FBQSxHQUFZLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBQTtFQUMzQixVQUFBLEdBQWEsT0FBTyxDQUFDLFVBQUE7RUFDckIsTUFBQSxHQUFTLEVBQUE7RUFDVCxLQUFTLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLElBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLFVBQUEsRUFBQSxJQUFBLEdBQUEsT0FBQSxDQUFBLE9BQUEsRUFBQSxJQUFBLEtBQUEsQ0FBQSxLQUFBLElBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLElBQUEsR0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxJQUFULEVBQUE7SUFDRSxNQUFBLEdBQVMsQ0FBQSxHQUFJLENBQUE7SUFDYixDQUFBLEdBQUksU0FBUyxDQUFFLE1BQUEsR0FBUyxDQUFYLENBQUE7SUFDYixDQUFBLEdBQUksU0FBUyxDQUFFLE1BQUEsR0FBUyxDQUFYLENBQUE7SUFDYixDQUFBLEdBQUksU0FBUyxDQUFFLE1BQUEsR0FBUyxDQUFYLENBQUE7SUFDYixDQUFBLEdBQUksU0FBUyxDQUFFLE1BQUEsR0FBUyxDQUFYLENBQUE7SUFHYixJQUFZLENBQUEsR0FBSSxHQUFoQixFQUFBOztNQUFBO0lBUEo7O0lBVUksSUFBSyxRQUFBLENBQVMsQ0FBVCxFQUFZLENBQVosRUFBZSxDQUFmLENBQUYsS0FBd0IsSUFBM0IsRUFBQTtNQUNFLE1BQU0sQ0FBQyxJQUFQLENBQVksQ0FBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVIsQ0FBWixDQURGOztFQWxDSjs7RUF1Q0UsSUFBRyxNQUFNLENBQUMsTUFBUCxLQUFpQixDQUFwQixFQUFBO0lBR0UsT0FBTyxFQUhUO0VBdkNGOzs7O0VBOENFLFFBQUEsR0FBVyxJQUFBLGtCQUFBLEVBQVMsTUFBVCxFQUFpQixPQUFPLENBQUMsVUFBekIsQ0FBQTtTQUNYLFFBQVEsQ0FBQyxPQUFULENBQUEsQ0FBQTtBQWhEUSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCB7IENhbnZhc0ltYWdlIH0gZnJvbSBcIi4vY2FudmFzLWltYWdlXCJcbmltcG9ydCB7IHF1YW50aXplIH0gZnJvbSBcIi4vcXVhbnRpemVcIlxuXG5cbmdldENvbG9yID0gKCBvcHRpb25zICkgLT5cbiAgb3B0aW9ucy5jb2xvckNvdW50ID89IDVcbiAgKCBnZXRQYWxldHRlIG9wdGlvbnMgKVsgMCBdXG5cblxuZ2V0UGFsZXR0ZSA9ICggb3B0aW9ucyApIC0+XG4gIG9wdGlvbnMuY29sb3JDb3VudCA/PSAxMFxuICBvcHRpb25zLnF1YWxpdHkgPz0gMTBcbiAgZXh0cmFjdCBvcHRpb25zXG5cblxuZXh0cmFjdCA9ICggb3B0aW9ucyApIC0+XG4gIGlmICEgQ2FudmFzSW1hZ2UuaXNUeXBlIG9wdGlvbnMuc291cmNlXG4gICAgdGhyb3cgbmV3IEVycm9yIFwib3B0aW9ucy5zb3VyY2UgbXVzdCBiZSBpbnN0YW5jZSBvZiBjb2xvci10aGllZiBDYW52YXNJbWFnZVwiXG5cbiAgb3B0aW9ucy5jb2xvckNvdW50ID0gTWF0aC5yb3VuZCBvcHRpb25zLmNvbG9yQ291bnRcbiAgaWYgKFR5cGUuaXNOYU4gb3B0aW9ucy5jb2xvckNvdW50KSB8fCAhKDEgPCBvcHRpb25zLmNvbG9yQ291bnQgPCAyNTYpXG4gICAgdGhyb3cgbmV3IEVycm9yIFwib3B0aW9ucy5jb2xvckNvdW50IG11c3QgYmUgYW4gaW50ZWdlciBiZXR3ZWVuIDIgYW5kIDI1NSBpbmNsdXNpdmVcIlxuICBcbiAgb3B0aW9ucy5xdWFsaXR5ID0gTWF0aC5yb3VuZCBvcHRpb25zLnF1YWxpdHlcbiAgaWYgKFR5cGUuaXNOYU4gb3B0aW9ucy5xdWFsaXR5KSB8fCAhKDAgPCBvcHRpb25zLnF1YWxpdHkpXG4gICAgdGhyb3cgbmV3IEVycm9yIFwib3B0aW9ucy5xdWFsaXR5IG11c3QgYmUgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gMFwiXG5cbiAgaWYgb3B0aW9ucy5hbGxvd1doaXRlID09IHRydWVcbiAgICAjIFdlIG5lZWQgdG8gcmVtb3ZlIGFueSBwaXhlbHMgYmV5b25kIHNSR0I/XG4gICAgZG9lc1Bhc3MgPSAoIHIsIGcsIGIgKSAtPiAhKHIgPiAyNTUgJiYgZyA+IDI1NSAmJiBiID4gMjU1KVxuICBlbHNlXG4gICAgIyBGaWx0ZXIgb3V0IHBpeGVscyB0aGF0IGFyZSB0b28gY2xvc2UgdG8gd2hpdGUgcmdiKDI1NSwgMjU1LCAyNTUpXG4gICAgZG9lc1Bhc3MgPSAoIHIsIGcsIGIgKSAtPiAhKHIgPiAyNTAgJiYgZyA+IDI1MCAmJiBiID4gMjUwKVxuXG5cbiAgIyBDYW52YXMgc3RvcmVzIHBpeGVsIGRhdGEgaW4gYSAxRCBhcnJheS4gUmVmb3JtYXQgZm9yIHF1YW50aXplIGZ1bmN0aW9uLlxuICByYXdQaXhlbHMgPSBvcHRpb25zLnNvdXJjZS5waXhlbHNcbiAgYWxsb3dXaGl0ZSA9IG9wdGlvbnMuYWxsb3dXaGl0ZVxuICBwaXhlbHMgPSBbXVxuICBmb3IgaSBpbiBbIDAgLi4uIG9wdGlvbnMuc291cmNlLnBpeGVsQ291bnQgXSBieSBvcHRpb25zLnF1YWxpdHlcbiAgICBvZmZzZXQgPSBpICogNFxuICAgIHIgPSByYXdQaXhlbHNbIG9mZnNldCArIDAgXVxuICAgIGcgPSByYXdQaXhlbHNbIG9mZnNldCArIDEgXVxuICAgIGIgPSByYXdQaXhlbHNbIG9mZnNldCArIDIgXVxuICAgIGEgPSByYXdQaXhlbHNbIG9mZnNldCArIDMgXVxuXG4gICAgIyBGaWx0ZXIgdHJhbnNwYXJlbnQgcGl4ZWxzXG4gICAgY29udGludWUgaWYgYSA8IDEyNVxuXG4gICAgIyBGaWx0ZXIgb3V0IHBpeGVscyB0aGF0IGFyZSB0b28gbGlnaHRcbiAgICBpZiAoIGRvZXNQYXNzIHIsIGcsIGIgKSA9PSB0cnVlXG4gICAgICBwaXhlbHMucHVzaCBbIHIsIGcsIGIgXVxuXG5cbiAgIyBGaW5hbCBjaGVjayBvbiBuZXcgcGl4ZWwgYXJyYXlcbiAgaWYgcGl4ZWxzLmxlbmd0aCA9PSAwXG4gICAgIyAjIFRPRE86IHdlIHNob3VsZCB0aHJvdyBoZXJlLCBidXQgSSBoYXZlIGEgd2VpcmQgU3ZlbHRlIGlzc3VlLlxuICAgICMgdGhyb3cgbmV3IEVycm9yIFwicXVhbnRpemUgcGl4ZWwgYXJyYXkgY2Fubm90IGhhdmUgbGVudGggMFwiXG4gICAgcmV0dXJuIFtdXG5cblxuICAjIHF1YW50aXplIGNsdXN0ZXJzIHZhbHVlcyB1c2luZyBtZWRpYW4gY3V0IGFsZ29yaXRobVxuICBjb2xvck1hcCA9IHF1YW50aXplIHBpeGVscywgb3B0aW9ucy5jb2xvckNvdW50XG4gIGNvbG9yTWFwLnBhbGV0dGUoKVxuXG5cbmV4cG9ydCB7XG4gIENhbnZhc0ltYWdlXG5cbiAgZ2V0Q29sb3JcbiAgZ2V0UGFsZXR0ZVxuICBleHRyYWN0XG59Il0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=src/index.coffee