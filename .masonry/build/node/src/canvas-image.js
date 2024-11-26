"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CanvasImage", {
    enumerable: true,
    get: function() {
        return CanvasImage;
    }
});
const _metaclass = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/metaclass"));
const _type = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/type"));
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
var CanvasImage;
CanvasImage = (function() {
    class CanvasImage {
        constructor({ canvas, image }){
            this.context = canvas.getContext("2d");
            this.width = canvas.width = image.naturalWidth;
            this.height = canvas.height = image.naturalHeight;
            this.context.drawImage(image, 0, 0, this.width, this.height);
        }
        static create({ canvas, image }) {
            return new CanvasImage({
                canvas,
                image
            });
        }
        clear() {
            return this.context.clearRect(0, 0, this.width, this.height);
        }
        update(data) {
            return this.context.putImageData(data, 0, 0);
        }
    }
    ;
    _metaclass.mixin(CanvasImage.prototype, [
        _metaclass.getters({
            pixelCount: function() {
                return this.width * this.height;
            },
            data: function() {
                return this.context.getImageData(0, 0, this.width, this.height);
            },
            pixels: function() {
                return this.data.data;
            }
        })
    ]);
    CanvasImage.isType = _type.isType(CanvasImage);
    return CanvasImage;
}).call(void 0);
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS9jb2xvci10aGllZi9zcmMvY2FudmFzLWltYWdlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8sQ0FBQSxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFHTTtFQUFOLE1BQUEsWUFBQTtJQUNFLFdBQWEsQ0FBQyxDQUFFLE1BQUYsRUFBVSxLQUFWLENBQUQsQ0FBQTtNQUNYLElBQUMsQ0FBQSxPQUFELEdBQVcsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsSUFBbEI7TUFDWCxJQUFDLENBQUEsS0FBRCxHQUFTLE1BQU0sQ0FBQyxLQUFQLEdBQWUsS0FBSyxDQUFDO01BQzlCLElBQUMsQ0FBQSxNQUFELEdBQVUsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsS0FBSyxDQUFDO01BQ2hDLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVCxDQUFtQixLQUFuQixFQUEwQixDQUExQixFQUE2QixDQUE3QixFQUFnQyxJQUFDLENBQUEsS0FBakMsRUFBd0MsSUFBQyxDQUFBLE1BQXpDO0lBSlc7O0lBYUosT0FBUixNQUFRLENBQUMsQ0FBRSxNQUFGLEVBQVUsS0FBVixDQUFELENBQUE7YUFDUCxJQUFJLFdBQUosQ0FBZ0IsQ0FBRSxNQUFGLEVBQVUsS0FBVixDQUFoQjtJQURPOztJQUtULEtBQU8sQ0FBQSxDQUFBO2FBQ0wsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULENBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLElBQUMsQ0FBQSxLQUExQixFQUFpQyxJQUFDLENBQUEsTUFBbEM7SUFESzs7SUFHUCxNQUFRLENBQUUsSUFBRixDQUFBO2FBQ04sSUFBQyxDQUFBLE9BQU8sQ0FBQyxZQUFULENBQXNCLElBQXRCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CO0lBRE07O0VBdEJWOztFQU9FLElBQUksQ0FBQyxLQUFMLENBQVcsV0FBQyxDQUFBLFNBQVosRUFBZ0I7SUFDZCxJQUFJLENBQUMsT0FBTCxDQUNFO01BQUEsVUFBQSxFQUFZLFFBQUEsQ0FBQSxDQUFBO2VBQUcsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUE7TUFBYixDQUFaO01BQ0EsSUFBQSxFQUFNLFFBQUEsQ0FBQSxDQUFBO2VBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxZQUFULENBQXNCLENBQXRCO0lBQXlCLENBQXpCO0lBQTRCLElBQUMsQ0FBQSxLQUE3QjtJQUFvQyxJQUFDLENBQUEsTUFBckM7TUFBSCxDQUROO01BRUEsTUFBQSxFQUFRLFFBQUEsQ0FBQSxDQUFBO2VBQUcsSUFBQyxDQUFBLElBQUksQ0FBQztNQUFUO0lBRlIsQ0FERixDQURjO0dBQWhCOztFQVVBLFdBQUMsQ0FBQSxNQUFELEdBQVMsSUFBSSxDQUFDLE1BQUwsQ0FBWSxXQUFaOzs7Ozs7QUFTWCxPQUFBO0VBQVMsV0FBVCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE1ldGEgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvbWV0YWNsYXNzXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5cblxuY2xhc3MgQ2FudmFzSW1hZ2VcbiAgY29uc3RydWN0b3I6ICh7IGNhbnZhcywgaW1hZ2UgfSkgLT5cbiAgICBAY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0IFwiMmRcIlxuICAgIEB3aWR0aCA9IGNhbnZhcy53aWR0aCA9IGltYWdlLm5hdHVyYWxXaWR0aFxuICAgIEBoZWlnaHQgPSBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UubmF0dXJhbEhlaWdodFxuICAgIEBjb250ZXh0LmRyYXdJbWFnZSBpbWFnZSwgMCwgMCwgQHdpZHRoLCBAaGVpZ2h0XG5cbiAgTWV0YS5taXhpbiBAOjosIFtcbiAgICBNZXRhLmdldHRlcnNcbiAgICAgIHBpeGVsQ291bnQ6IC0+IEB3aWR0aCAqIEBoZWlnaHRcbiAgICAgIGRhdGE6IC0+IEBjb250ZXh0LmdldEltYWdlRGF0YSAwLCAwLCBAd2lkdGgsIEBoZWlnaHRcbiAgICAgIHBpeGVsczogLT4gQGRhdGEuZGF0YVxuICBdXG5cbiAgQGNyZWF0ZTogKHsgY2FudmFzLCBpbWFnZSB9KSAtPlxuICAgIG5ldyBDYW52YXNJbWFnZSB7IGNhbnZhcywgaW1hZ2UgfVxuXG4gIEBpc1R5cGU6IFR5cGUuaXNUeXBlIEBcblxuICBjbGVhcjogLT5cbiAgICBAY29udGV4dC5jbGVhclJlY3QgMCwgMCwgQHdpZHRoLCBAaGVpZ2h0XG5cbiAgdXBkYXRlOiAoIGRhdGEgKSAtPlxuICAgIEBjb250ZXh0LnB1dEltYWdlRGF0YSBkYXRhLCAwLCAwXG5cblxuZXhwb3J0IHsgQ2FudmFzSW1hZ2UgfSJdfQ==
 //# sourceURL=/@dashkite/color-thief/src/canvas-image.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvY29sb3ItdGhpZWYvc3JjL2NhbnZhcy1pbWFnZS5jb2ZmZWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTWV0YSBmcm9tIFwiQGRhc2hraXRlL2pveS9tZXRhY2xhc3NcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcblxuXG5jbGFzcyBDYW52YXNJbWFnZVxuICBjb25zdHJ1Y3RvcjogKHsgY2FudmFzLCBpbWFnZSB9KSAtPlxuICAgIEBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQgXCIyZFwiXG4gICAgQHdpZHRoID0gY2FudmFzLndpZHRoID0gaW1hZ2UubmF0dXJhbFdpZHRoXG4gICAgQGhlaWdodCA9IGNhbnZhcy5oZWlnaHQgPSBpbWFnZS5uYXR1cmFsSGVpZ2h0XG4gICAgQGNvbnRleHQuZHJhd0ltYWdlIGltYWdlLCAwLCAwLCBAd2lkdGgsIEBoZWlnaHRcblxuICBNZXRhLm1peGluIEA6OiwgW1xuICAgIE1ldGEuZ2V0dGVyc1xuICAgICAgcGl4ZWxDb3VudDogLT4gQHdpZHRoICogQGhlaWdodFxuICAgICAgZGF0YTogLT4gQGNvbnRleHQuZ2V0SW1hZ2VEYXRhIDAsIDAsIEB3aWR0aCwgQGhlaWdodFxuICAgICAgcGl4ZWxzOiAtPiBAZGF0YS5kYXRhXG4gIF1cblxuICBAY3JlYXRlOiAoeyBjYW52YXMsIGltYWdlIH0pIC0+XG4gICAgbmV3IENhbnZhc0ltYWdlIHsgY2FudmFzLCBpbWFnZSB9XG5cbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG4gIGNsZWFyOiAtPlxuICAgIEBjb250ZXh0LmNsZWFyUmVjdCAwLCAwLCBAd2lkdGgsIEBoZWlnaHRcblxuICB1cGRhdGU6ICggZGF0YSApIC0+XG4gICAgQGNvbnRleHQucHV0SW1hZ2VEYXRhIGRhdGEsIDAsIDBcblxuXG5leHBvcnQgeyBDYW52YXNJbWFnZSB9Il0sIm5hbWVzIjpbIkNhbnZhc0ltYWdlIiwiY29uc3RydWN0b3IiLCJjYW52YXMiLCJpbWFnZSIsImNvbnRleHQiLCJnZXRDb250ZXh0Iiwid2lkdGgiLCJuYXR1cmFsV2lkdGgiLCJoZWlnaHQiLCJuYXR1cmFsSGVpZ2h0IiwiZHJhd0ltYWdlIiwiY3JlYXRlIiwiY2xlYXIiLCJjbGVhclJlY3QiLCJ1cGRhdGUiLCJkYXRhIiwicHV0SW1hZ2VEYXRhIiwiTWV0YSIsIm1peGluIiwicHJvdG90eXBlIiwiZ2V0dGVycyIsInBpeGVsQ291bnQiLCJnZXRJbWFnZURhdGEiLCJwaXhlbHMiLCJpc1R5cGUiLCJUeXBlIl0sIm1hcHBpbmdzIjoiOzs7OytCQThCU0E7OztlQUFBQTs7O21FQTlCVDs4REFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBREEsSUFBQUE7QUFJTUEsY0FBQSxDQUFBO0lBQU4sTUFBQUE7UUFDRUMsWUFBYyxFQUFFQyxNQUFGLEVBQVVDLEtBQVYsRUFBRCxDQUFBO1lBQ1gsSUFBQyxDQUFBQyxPQUFELEdBQVdGLE9BQU9HLFVBQVAsQ0FBa0I7WUFDN0IsSUFBQyxDQUFBQyxLQUFELEdBQVNKLE9BQU9JLEtBQVAsR0FBZUgsTUFBTUksWUFBQTtZQUM5QixJQUFDLENBQUFDLE1BQUQsR0FBVU4sT0FBT00sTUFBUCxHQUFnQkwsTUFBTU0sYUFBQTtZQUNoQyxJQUFDLENBQUFMLE9BQU8sQ0FBQ00sU0FBVCxDQUFtQlAsT0FBTyxHQUFHLEdBQUcsSUFBQyxDQUFBRyxLQUFqQyxFQUF3QyxJQUFDLENBQUFFLE1BQXpDO1FBSlc7UUFhSixPQUFSRyxPQUFTLEVBQUVULE1BQUYsRUFBVUMsS0FBVixFQUFELEVBQUE7bUJBQ1AsSUFBSUgsWUFBWTtnQkFBRUU7Z0JBQVFDO1lBQVY7UUFEVDtRQUtUUyxRQUFPO21CQUNMLElBQUMsQ0FBQVIsT0FBTyxDQUFDUyxTQUFULENBQW1CLEdBQUcsR0FBRyxJQUFDLENBQUFQLEtBQTFCLEVBQWlDLElBQUMsQ0FBQUUsTUFBbEM7UUFESztRQUdQTSxPQUFVQyxJQUFGLEVBQUE7bUJBQ04sSUFBQyxDQUFBWCxPQUFPLENBQUNZLFlBQVQsQ0FBc0JELE1BQU0sR0FBRztRQUR6QjtJQXRCVjs7SUFPRUUsV0FBS0MsS0FBTCxDQUFXbEIsWUFBQ21CLFNBQVosRUFBZ0I7UUFDZEYsV0FBS0csT0FBTCxDQUNFO1lBQUFDLFlBQVk7dUJBQUcsSUFBQyxDQUFBZixLQUFELEdBQVMsSUFBQyxDQUFBRSxNQUFBO1lBQWI7WUFDWk8sTUFBTTt1QkFBRyxJQUFDLENBQUFYLE9BQU8sQ0FBQ2tCLFlBQVQsQ0FBc0IsR0FBRyxHQUFHLElBQUMsQ0FBQWhCLEtBQTdCLEVBQW9DLElBQUMsQ0FBQUUsTUFBckM7WUFBSDtZQUNOZSxRQUFRO3VCQUFHLElBQUMsQ0FBQVIsSUFBSSxDQUFDQSxJQUFBO1lBQVQ7UUFGUjtLQUZKO0lBVUFmLFlBQUN3QixNQUFELEdBQVNDLE1BQUtELE1BQUwsQ0FBWXhCIn0=