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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlcyI6WyIvQGRhc2hraXRlL2NvbG9yLXRoaWVmL3NyYy9jYW52YXMtaW1hZ2UuY29mZmVlIl0sInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNZXRhIGZyb20gXCJAZGFzaGtpdGUvam95L21ldGFjbGFzc1wiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuXG5cbmNsYXNzIENhbnZhc0ltYWdlXG4gIGNvbnN0cnVjdG9yOiAoeyBjYW52YXMsIGltYWdlIH0pIC0+XG4gICAgQGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCBcIjJkXCJcbiAgICBAd2lkdGggPSBjYW52YXMud2lkdGggPSBpbWFnZS5uYXR1cmFsV2lkdGhcbiAgICBAaGVpZ2h0ID0gY2FudmFzLmhlaWdodCA9IGltYWdlLm5hdHVyYWxIZWlnaHRcbiAgICBAY29udGV4dC5kcmF3SW1hZ2UgaW1hZ2UsIDAsIDAsIEB3aWR0aCwgQGhlaWdodFxuXG4gIE1ldGEubWl4aW4gQDo6LCBbXG4gICAgTWV0YS5nZXR0ZXJzXG4gICAgICBwaXhlbENvdW50OiAtPiBAd2lkdGggKiBAaGVpZ2h0XG4gICAgICBkYXRhOiAtPiBAY29udGV4dC5nZXRJbWFnZURhdGEgMCwgMCwgQHdpZHRoLCBAaGVpZ2h0XG4gICAgICBwaXhlbHM6IC0+IEBkYXRhLmRhdGFcbiAgXVxuXG4gIEBjcmVhdGU6ICh7IGNhbnZhcywgaW1hZ2UgfSkgLT5cbiAgICBuZXcgQ2FudmFzSW1hZ2UgeyBjYW52YXMsIGltYWdlIH1cblxuICBAaXNUeXBlOiBUeXBlLmlzVHlwZSBAXG5cbiAgY2xlYXI6IC0+XG4gICAgQGNvbnRleHQuY2xlYXJSZWN0IDAsIDAsIEB3aWR0aCwgQGhlaWdodFxuXG4gIHVwZGF0ZTogKCBkYXRhICkgLT5cbiAgICBAY29udGV4dC5wdXRJbWFnZURhdGEgZGF0YSwgMCwgMFxuXG5cbmV4cG9ydCB7IENhbnZhc0ltYWdlIH0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzsrQkE4QlMsV0FBVDs7Ozs7O21FQTlCQTs4REFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBREEsSUFBQTtBQUlNLGNBQUEsQ0FBQTtJQUFOLE1BQUEsWUFBQTtRQUNFLFdBQWEsQ0FBQyxFQUFFLE1BQUYsRUFBVSxLQUFWLEVBQUQsQ0FBQTtZQUNYLElBQUMsQ0FBQSxPQUFELEdBQVcsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsSUFBbEI7WUFDWCxJQUFDLENBQUEsS0FBRCxHQUFTLE1BQU0sQ0FBQyxLQUFQLEdBQWUsS0FBSyxDQUFDLFlBQUE7WUFDOUIsSUFBQyxDQUFBLE1BQUQsR0FBVSxNQUFNLENBQUMsTUFBUCxHQUFnQixLQUFLLENBQUMsYUFBQTtZQUNoQyxJQUFDLENBQUEsT0FBTyxDQUFDLFNBQVQsQ0FBbUIsS0FBbkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsSUFBQyxDQUFBLEtBQWpDLEVBQXdDLElBQUMsQ0FBQSxNQUF6QztRQUpXO1FBYUosT0FBUixNQUFRLENBQUMsRUFBRSxNQUFGLEVBQVUsS0FBVixFQUFELENBQUEsQ0FBQTttQkFDUCxJQUFJLFdBQUosQ0FBZ0I7Z0JBQUUsTUFBRjtnQkFBVTtZQUFWLENBQWhCO1FBRE87UUFLVCxLQUFPLENBQUEsQ0FBQSxDQUFBO21CQUNMLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVCxDQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixJQUFDLENBQUEsS0FBMUIsRUFBaUMsSUFBQyxDQUFBLE1BQWxDO1FBREs7UUFHUCxNQUFRLENBQUUsSUFBRixDQUFBLENBQUE7bUJBQ04sSUFBQyxDQUFBLE9BQU8sQ0FBQyxZQUFULENBQXNCLElBQXRCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CO1FBRE07SUF0QlY7O0lBT0UsSUFBSSxPQUFDLEtBQUwsQ0FBVyxXQUFDLENBQUEsU0FBWixFQUFnQjtRQUNkLElBQUksT0FBQyxPQUFMLENBQ0U7WUFBQSxVQUFBLEVBQVksUUFBQSxDQUFBLENBQUE7dUJBQUcsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUEsTUFBQTtZQUFiLENBQVo7WUFDQSxJQUFBLEVBQU0sUUFBQSxDQUFBLENBQUE7dUJBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxZQUFULENBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLElBQUMsQ0FBQSxLQUE3QixFQUFvQyxJQUFDLENBQUEsTUFBckM7WUFBSCxDQUROO1lBRUEsTUFBQSxFQUFRLFFBQUEsQ0FBQSxDQUFBO3VCQUFHLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBQTtZQUFUO1FBRlIsQ0FERixDQURjO0tBQWhCO0lBVUEsV0FBQyxDQUFBLE1BQUQsR0FBUyxJQUFJLEVBQUMsTUFBTCxDQUFZLFdBQVoifQ==