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
    CanvasImage: function() {
        return _canvasimage.CanvasImage;
    },
    extract: function() {
        return extract;
    },
    getColor: function() {
        return getColor;
    },
    getPalette: function() {
        return getPalette;
    }
});
const _type = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/type"));
const _canvasimage = require("./canvas-image");
const _quantize = require("./quantize");
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
var extract, getColor, getPalette;
getColor = function(options) {
    if (options.colorCount == null) {
        options.colorCount = 5;
    }
    return getPalette(options)[0];
};
getPalette = function(options) {
    if (options.colorCount == null) {
        options.colorCount = 10;
    }
    if (options.quality == null) {
        options.quality = 10;
    }
    return extract(options);
};
extract = function(options) {
    var a, allowWhite, b, colorMap, doesPass, g, i, j, offset, pixels, r, rawPixels, ref, ref1, ref2;
    if (!_canvasimage.CanvasImage.isType(options.source)) {
        throw new Error("options.source must be instance of color-thief CanvasImage");
    }
    options.colorCount = Math.round(options.colorCount);
    if (_type.isNaN(options.colorCount) || !(1 < (ref = options.colorCount) && ref < 256)) {
        throw new Error("options.colorCount must be an integer between 2 and 255 inclusive");
    }
    options.quality = Math.round(options.quality);
    if (_type.isNaN(options.quality) || !(0 < options.quality)) {
        throw new Error("options.quality must be an integer greater than 0");
    }
    if (options.allowWhite === true) {
        // We need to remove any pixels beyond sRGB?
        doesPass = function(r, g, b) {
            return !(r > 255 && g > 255 && b > 255);
        };
    } else {
        // Filter out pixels that are too close to white rgb(255, 255, 255)
        doesPass = function(r, g, b) {
            return !(r > 250 && g > 250 && b > 250);
        };
    }
    // Canvas stores pixel data in a 1D array. Reformat for quantize function.
    rawPixels = options.source.pixels;
    allowWhite = options.allowWhite;
    pixels = [];
    for(i = j = 0, ref1 = options.source.pixelCount, ref2 = options.quality; ref2 !== 0 && (ref2 > 0 ? j < ref1 : j > ref1); i = j += ref2){
        offset = i * 4;
        r = rawPixels[offset + 0];
        g = rawPixels[offset + 1];
        b = rawPixels[offset + 2];
        a = rawPixels[offset + 3];
        if (a < 125) {
            continue;
        }
        // Filter out pixels that are too light
        if (doesPass(r, g, b) === true) {
            pixels.push([
                r,
                g,
                b
            ]);
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
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS9jb2xvci10aGllZi9zcmMvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQTs7QUFBQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxXQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsUUFBVDtDQUFBLE1BQUE7O0FBR0EsUUFBQSxHQUFXLFFBQUEsQ0FBRSxPQUFGLENBQUE7O0lBQ1QsT0FBTyxDQUFDLGFBQWM7O1NBQ3RCLENBQUUsVUFBQSxDQUFXLE9BQVgsQ0FBRixDQUFzQixDQUFFLENBQUY7QUFGYjs7QUFLWCxVQUFBLEdBQWEsUUFBQSxDQUFFLE9BQUYsQ0FBQTs7SUFDWCxPQUFPLENBQUMsYUFBYzs7O0lBQ3RCLE9BQU8sQ0FBQyxVQUFXOztTQUNuQixPQUFBLENBQVEsT0FBUjtBQUhXOztBQU1iLE9BQUEsR0FBVSxRQUFBLENBQUUsT0FBRixDQUFBO0FBQ1YsTUFBQSxDQUFBLEVBQUEsVUFBQSxFQUFBLENBQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLFNBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBO0VBQUUsSUFBRyxDQUFFLFdBQVcsQ0FBQyxNQUFaLENBQW1CLE9BQU8sQ0FBQyxNQUEzQixDQUFMO0lBQ0UsTUFBTSxJQUFJLEtBQUosQ0FBVSw0REFBVixFQURSOztFQUdBLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLElBQUksQ0FBQyxLQUFMLENBQVcsT0FBTyxDQUFDLFVBQW5CO0VBQ3JCLElBQUcsQ0FBQyxJQUFJLENBQUMsS0FBTCxDQUFXLE9BQU8sQ0FBQyxVQUFuQixDQUFELENBQUEsSUFBbUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxVQUFJLE9BQU8sQ0FBQyxXQUFaLE9BQUEsR0FBeUIsR0FBekIsQ0FBRCxDQUF2QztJQUNFLE1BQU0sSUFBSSxLQUFKLENBQVUsbUVBQVYsRUFEUjs7RUFHQSxPQUFPLENBQUMsT0FBUixHQUFrQixJQUFJLENBQUMsS0FBTCxDQUFXLE9BQU8sQ0FBQyxPQUFuQjtFQUNsQixJQUFHLENBQUMsSUFBSSxDQUFDLEtBQUwsQ0FBVyxPQUFPLENBQUMsT0FBbkIsQ0FBRCxDQUFBLElBQWdDLENBQUMsQ0FBQyxDQUFBLEdBQUksT0FBTyxDQUFDLE9BQWIsQ0FBcEM7SUFDRSxNQUFNLElBQUksS0FBSixDQUFVLG1EQUFWLEVBRFI7O0VBR0EsSUFBRyxPQUFPLENBQUMsVUFBUixLQUFzQixJQUF6Qjs7SUFFRSxRQUFBLEdBQVcsUUFBQSxDQUFFLENBQUYsRUFBSyxDQUFMLEVBQVEsQ0FBUixDQUFBO2FBQWUsQ0FBQyxDQUFDLENBQUEsR0FBSSxHQUFKLElBQVcsQ0FBQSxHQUFJLEdBQWYsSUFBc0IsQ0FBQSxHQUFJLEdBQTNCO0lBQWhCLEVBRmI7R0FBQSxNQUFBOztJQUtFLFFBQUEsR0FBVyxRQUFBLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSLENBQUE7YUFBZSxDQUFDLENBQUMsQ0FBQSxHQUFJLEdBQUosSUFBVyxDQUFBLEdBQUksR0FBZixJQUFzQixDQUFBLEdBQUksR0FBM0I7SUFBaEIsRUFMYjtHQVhGOztFQW9CRSxTQUFBLEdBQVksT0FBTyxDQUFDLE1BQU0sQ0FBQztFQUMzQixVQUFBLEdBQWEsT0FBTyxDQUFDO0VBQ3JCLE1BQUEsR0FBUztFQUNULEtBQVMsa0lBQVQ7SUFDRSxNQUFBLEdBQVMsQ0FBQSxHQUFJO0lBQ2IsQ0FBQSxHQUFJLFNBQVMsQ0FBRSxNQUFBLEdBQVMsQ0FBWDtJQUNiLENBQUEsR0FBSSxTQUFTLENBQUUsTUFBQSxHQUFTLENBQVg7SUFDYixDQUFBLEdBQUksU0FBUyxDQUFFLE1BQUEsR0FBUyxDQUFYO0lBQ2IsQ0FBQSxHQUFJLFNBQVMsQ0FBRSxNQUFBLEdBQVMsQ0FBWDtJQUdiLElBQVksQ0FBQSxHQUFJLEdBQWhCOztBQUFBLGVBQUE7S0FQSjs7SUFVSSxJQUFHLENBQUUsUUFBQSxDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixDQUFGLENBQUEsS0FBd0IsSUFBM0I7TUFDRSxNQUFNLENBQUMsSUFBUCxDQUFZLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSLENBQVosRUFERjs7RUFYRixDQXZCRjs7RUF1Q0UsSUFBRyxNQUFNLENBQUMsTUFBUCxLQUFpQixDQUFwQjtBQUdFLFdBQU8sR0FIVDtHQXZDRjs7OztFQThDRSxRQUFBLEdBQVcsUUFBQSxDQUFTLE1BQVQsRUFBaUIsT0FBTyxDQUFDLFVBQXpCO1NBQ1gsUUFBUSxDQUFDLE9BQVQsQ0FBQTtBQWhEUTs7QUFtRFYsT0FBQTtFQUNFLFdBREY7RUFHRSxRQUhGO0VBSUUsVUFKRjtFQUtFLE9BTEYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0IHsgQ2FudmFzSW1hZ2UgfSBmcm9tIFwiLi9jYW52YXMtaW1hZ2VcIlxuaW1wb3J0IHsgcXVhbnRpemUgfSBmcm9tIFwiLi9xdWFudGl6ZVwiXG5cblxuZ2V0Q29sb3IgPSAoIG9wdGlvbnMgKSAtPlxuICBvcHRpb25zLmNvbG9yQ291bnQgPz0gNVxuICAoIGdldFBhbGV0dGUgb3B0aW9ucyApWyAwIF1cblxuXG5nZXRQYWxldHRlID0gKCBvcHRpb25zICkgLT5cbiAgb3B0aW9ucy5jb2xvckNvdW50ID89IDEwXG4gIG9wdGlvbnMucXVhbGl0eSA/PSAxMFxuICBleHRyYWN0IG9wdGlvbnNcblxuXG5leHRyYWN0ID0gKCBvcHRpb25zICkgLT5cbiAgaWYgISBDYW52YXNJbWFnZS5pc1R5cGUgb3B0aW9ucy5zb3VyY2VcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJvcHRpb25zLnNvdXJjZSBtdXN0IGJlIGluc3RhbmNlIG9mIGNvbG9yLXRoaWVmIENhbnZhc0ltYWdlXCJcblxuICBvcHRpb25zLmNvbG9yQ291bnQgPSBNYXRoLnJvdW5kIG9wdGlvbnMuY29sb3JDb3VudFxuICBpZiAoVHlwZS5pc05hTiBvcHRpb25zLmNvbG9yQ291bnQpIHx8ICEoMSA8IG9wdGlvbnMuY29sb3JDb3VudCA8IDI1NilcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJvcHRpb25zLmNvbG9yQ291bnQgbXVzdCBiZSBhbiBpbnRlZ2VyIGJldHdlZW4gMiBhbmQgMjU1IGluY2x1c2l2ZVwiXG4gIFxuICBvcHRpb25zLnF1YWxpdHkgPSBNYXRoLnJvdW5kIG9wdGlvbnMucXVhbGl0eVxuICBpZiAoVHlwZS5pc05hTiBvcHRpb25zLnF1YWxpdHkpIHx8ICEoMCA8IG9wdGlvbnMucXVhbGl0eSlcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJvcHRpb25zLnF1YWxpdHkgbXVzdCBiZSBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiAwXCJcblxuICBpZiBvcHRpb25zLmFsbG93V2hpdGUgPT0gdHJ1ZVxuICAgICMgV2UgbmVlZCB0byByZW1vdmUgYW55IHBpeGVscyBiZXlvbmQgc1JHQj9cbiAgICBkb2VzUGFzcyA9ICggciwgZywgYiApIC0+ICEociA+IDI1NSAmJiBnID4gMjU1ICYmIGIgPiAyNTUpXG4gIGVsc2VcbiAgICAjIEZpbHRlciBvdXQgcGl4ZWxzIHRoYXQgYXJlIHRvbyBjbG9zZSB0byB3aGl0ZSByZ2IoMjU1LCAyNTUsIDI1NSlcbiAgICBkb2VzUGFzcyA9ICggciwgZywgYiApIC0+ICEociA+IDI1MCAmJiBnID4gMjUwICYmIGIgPiAyNTApXG5cblxuICAjIENhbnZhcyBzdG9yZXMgcGl4ZWwgZGF0YSBpbiBhIDFEIGFycmF5LiBSZWZvcm1hdCBmb3IgcXVhbnRpemUgZnVuY3Rpb24uXG4gIHJhd1BpeGVscyA9IG9wdGlvbnMuc291cmNlLnBpeGVsc1xuICBhbGxvd1doaXRlID0gb3B0aW9ucy5hbGxvd1doaXRlXG4gIHBpeGVscyA9IFtdXG4gIGZvciBpIGluIFsgMCAuLi4gb3B0aW9ucy5zb3VyY2UucGl4ZWxDb3VudCBdIGJ5IG9wdGlvbnMucXVhbGl0eVxuICAgIG9mZnNldCA9IGkgKiA0XG4gICAgciA9IHJhd1BpeGVsc1sgb2Zmc2V0ICsgMCBdXG4gICAgZyA9IHJhd1BpeGVsc1sgb2Zmc2V0ICsgMSBdXG4gICAgYiA9IHJhd1BpeGVsc1sgb2Zmc2V0ICsgMiBdXG4gICAgYSA9IHJhd1BpeGVsc1sgb2Zmc2V0ICsgMyBdXG5cbiAgICAjIEZpbHRlciB0cmFuc3BhcmVudCBwaXhlbHNcbiAgICBjb250aW51ZSBpZiBhIDwgMTI1XG5cbiAgICAjIEZpbHRlciBvdXQgcGl4ZWxzIHRoYXQgYXJlIHRvbyBsaWdodFxuICAgIGlmICggZG9lc1Bhc3MgciwgZywgYiApID09IHRydWVcbiAgICAgIHBpeGVscy5wdXNoIFsgciwgZywgYiBdXG5cblxuICAjIEZpbmFsIGNoZWNrIG9uIG5ldyBwaXhlbCBhcnJheVxuICBpZiBwaXhlbHMubGVuZ3RoID09IDBcbiAgICAjICMgVE9ETzogd2Ugc2hvdWxkIHRocm93IGhlcmUsIGJ1dCBJIGhhdmUgYSB3ZWlyZCBTdmVsdGUgaXNzdWUuXG4gICAgIyB0aHJvdyBuZXcgRXJyb3IgXCJxdWFudGl6ZSBwaXhlbCBhcnJheSBjYW5ub3QgaGF2ZSBsZW50aCAwXCJcbiAgICByZXR1cm4gW11cblxuXG4gICMgcXVhbnRpemUgY2x1c3RlcnMgdmFsdWVzIHVzaW5nIG1lZGlhbiBjdXQgYWxnb3JpdGhtXG4gIGNvbG9yTWFwID0gcXVhbnRpemUgcGl4ZWxzLCBvcHRpb25zLmNvbG9yQ291bnRcbiAgY29sb3JNYXAucGFsZXR0ZSgpXG5cblxuZXhwb3J0IHtcbiAgQ2FudmFzSW1hZ2VcblxuICBnZXRDb2xvclxuICBnZXRQYWxldHRlXG4gIGV4dHJhY3Rcbn0iXX0=
 //# sourceURL=/@dashkite/color-thief/src/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvY29sb3ItdGhpZWYvc3JjL2luZGV4LmNvZmZlZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0IHsgQ2FudmFzSW1hZ2UgfSBmcm9tIFwiLi9jYW52YXMtaW1hZ2VcIlxuaW1wb3J0IHsgcXVhbnRpemUgfSBmcm9tIFwiLi9xdWFudGl6ZVwiXG5cblxuZ2V0Q29sb3IgPSAoIG9wdGlvbnMgKSAtPlxuICBvcHRpb25zLmNvbG9yQ291bnQgPz0gNVxuICAoIGdldFBhbGV0dGUgb3B0aW9ucyApWyAwIF1cblxuXG5nZXRQYWxldHRlID0gKCBvcHRpb25zICkgLT5cbiAgb3B0aW9ucy5jb2xvckNvdW50ID89IDEwXG4gIG9wdGlvbnMucXVhbGl0eSA/PSAxMFxuICBleHRyYWN0IG9wdGlvbnNcblxuXG5leHRyYWN0ID0gKCBvcHRpb25zICkgLT5cbiAgaWYgISBDYW52YXNJbWFnZS5pc1R5cGUgb3B0aW9ucy5zb3VyY2VcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJvcHRpb25zLnNvdXJjZSBtdXN0IGJlIGluc3RhbmNlIG9mIGNvbG9yLXRoaWVmIENhbnZhc0ltYWdlXCJcblxuICBvcHRpb25zLmNvbG9yQ291bnQgPSBNYXRoLnJvdW5kIG9wdGlvbnMuY29sb3JDb3VudFxuICBpZiAoVHlwZS5pc05hTiBvcHRpb25zLmNvbG9yQ291bnQpIHx8ICEoMSA8IG9wdGlvbnMuY29sb3JDb3VudCA8IDI1NilcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJvcHRpb25zLmNvbG9yQ291bnQgbXVzdCBiZSBhbiBpbnRlZ2VyIGJldHdlZW4gMiBhbmQgMjU1IGluY2x1c2l2ZVwiXG4gIFxuICBvcHRpb25zLnF1YWxpdHkgPSBNYXRoLnJvdW5kIG9wdGlvbnMucXVhbGl0eVxuICBpZiAoVHlwZS5pc05hTiBvcHRpb25zLnF1YWxpdHkpIHx8ICEoMCA8IG9wdGlvbnMucXVhbGl0eSlcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJvcHRpb25zLnF1YWxpdHkgbXVzdCBiZSBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiAwXCJcblxuICBpZiBvcHRpb25zLmFsbG93V2hpdGUgPT0gdHJ1ZVxuICAgICMgV2UgbmVlZCB0byByZW1vdmUgYW55IHBpeGVscyBiZXlvbmQgc1JHQj9cbiAgICBkb2VzUGFzcyA9ICggciwgZywgYiApIC0+ICEociA+IDI1NSAmJiBnID4gMjU1ICYmIGIgPiAyNTUpXG4gIGVsc2VcbiAgICAjIEZpbHRlciBvdXQgcGl4ZWxzIHRoYXQgYXJlIHRvbyBjbG9zZSB0byB3aGl0ZSByZ2IoMjU1LCAyNTUsIDI1NSlcbiAgICBkb2VzUGFzcyA9ICggciwgZywgYiApIC0+ICEociA+IDI1MCAmJiBnID4gMjUwICYmIGIgPiAyNTApXG5cblxuICAjIENhbnZhcyBzdG9yZXMgcGl4ZWwgZGF0YSBpbiBhIDFEIGFycmF5LiBSZWZvcm1hdCBmb3IgcXVhbnRpemUgZnVuY3Rpb24uXG4gIHJhd1BpeGVscyA9IG9wdGlvbnMuc291cmNlLnBpeGVsc1xuICBhbGxvd1doaXRlID0gb3B0aW9ucy5hbGxvd1doaXRlXG4gIHBpeGVscyA9IFtdXG4gIGZvciBpIGluIFsgMCAuLi4gb3B0aW9ucy5zb3VyY2UucGl4ZWxDb3VudCBdIGJ5IG9wdGlvbnMucXVhbGl0eVxuICAgIG9mZnNldCA9IGkgKiA0XG4gICAgciA9IHJhd1BpeGVsc1sgb2Zmc2V0ICsgMCBdXG4gICAgZyA9IHJhd1BpeGVsc1sgb2Zmc2V0ICsgMSBdXG4gICAgYiA9IHJhd1BpeGVsc1sgb2Zmc2V0ICsgMiBdXG4gICAgYSA9IHJhd1BpeGVsc1sgb2Zmc2V0ICsgMyBdXG5cbiAgICAjIEZpbHRlciB0cmFuc3BhcmVudCBwaXhlbHNcbiAgICBjb250aW51ZSBpZiBhIDwgMTI1XG5cbiAgICAjIEZpbHRlciBvdXQgcGl4ZWxzIHRoYXQgYXJlIHRvbyBsaWdodFxuICAgIGlmICggZG9lc1Bhc3MgciwgZywgYiApID09IHRydWVcbiAgICAgIHBpeGVscy5wdXNoIFsgciwgZywgYiBdXG5cblxuICAjIEZpbmFsIGNoZWNrIG9uIG5ldyBwaXhlbCBhcnJheVxuICBpZiBwaXhlbHMubGVuZ3RoID09IDBcbiAgICAjICMgVE9ETzogd2Ugc2hvdWxkIHRocm93IGhlcmUsIGJ1dCBJIGhhdmUgYSB3ZWlyZCBTdmVsdGUgaXNzdWUuXG4gICAgIyB0aHJvdyBuZXcgRXJyb3IgXCJxdWFudGl6ZSBwaXhlbCBhcnJheSBjYW5ub3QgaGF2ZSBsZW50aCAwXCJcbiAgICByZXR1cm4gW11cblxuXG4gICMgcXVhbnRpemUgY2x1c3RlcnMgdmFsdWVzIHVzaW5nIG1lZGlhbiBjdXQgYWxnb3JpdGhtXG4gIGNvbG9yTWFwID0gcXVhbnRpemUgcGl4ZWxzLCBvcHRpb25zLmNvbG9yQ291bnRcbiAgY29sb3JNYXAucGFsZXR0ZSgpXG5cblxuZXhwb3J0IHtcbiAgQ2FudmFzSW1hZ2VcblxuICBnZXRDb2xvclxuICBnZXRQYWxldHRlXG4gIGV4dHJhY3Rcbn0iXSwibmFtZXMiOlsiQ2FudmFzSW1hZ2UiLCJleHRyYWN0IiwiZ2V0Q29sb3IiLCJnZXRQYWxldHRlIiwib3B0aW9ucyIsImNvbG9yQ291bnQiLCJxdWFsaXR5IiwiYSIsImFsbG93V2hpdGUiLCJiIiwiY29sb3JNYXAiLCJkb2VzUGFzcyIsImciLCJpIiwiaiIsIm9mZnNldCIsInBpeGVscyIsInIiLCJyYXdQaXhlbHMiLCJyZWYiLCJyZWYxIiwicmVmMiIsImlzVHlwZSIsInNvdXJjZSIsIkVycm9yIiwiTWF0aCIsInJvdW5kIiwiVHlwZSIsImlzTmFOIiwicGl4ZWxDb3VudCIsInB1c2giLCJsZW5ndGgiLCJxdWFudGl6ZSIsInBhbGV0dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBb0VFQSxXQURGO2VBQ0VBLHdCQURGOztJQUtFQyxPQUxGO2VBS0VBOztJQUZBQyxRQUhGO2VBR0VBOztJQUNBQyxVQUpGO2VBSUVBOzs7OERBdkVGOzZCQUNBOzBCQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7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