"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("source-map-support/register");
const _assert = /*#__PURE__*/ _interop_require_default(require("@dashkite/assert"));
const _amen = require("@dashkite/amen");
const _amenconsole = /*#__PURE__*/ _interop_require_default(require("@dashkite/amen-console"));
const _promises = /*#__PURE__*/ _interop_require_default(require("node:fs/promises"));
const _canvas = require("canvas");
const _src = /*#__PURE__*/ _interop_require_wildcard(require("../src"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
(async function() {
    (0, _amenconsole.default)(await (0, _amen.test)("Color Thief", [
        (0, _amen.test)("palette", async function() {
            var canvas, colorArray, image, source;
            canvas = (0, _canvas.createCanvas)();
            image = new _canvas.Image();
            image.src = await _promises.default.readFile("test/sunflower-aaron-burden.jpg");
            source = _src.CanvasImage.create({
                canvas,
                image
            });
            colorArray = _src.getPalette({
                source,
                colorCount: 5,
                quality: 1
            });
            return _assert.default.deepEqual([
                181,
                196,
                221
            ], colorArray[0]);
        })
    ]));
    return process.exit(_amen.success ? 0 : 1);
})(); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS9jb2xvci10aGllZi90ZXN0L2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFBOztBQUNBLE9BQU8sTUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxJQUFUO0VBQWUsT0FBZjtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxLQUFQLE1BQUE7O0FBRUEsT0FBTyxFQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLFlBQVQ7RUFBdUIsS0FBdkI7Q0FBQSxNQUFBOztBQUNBLE9BQU8sQ0FBQSxLQUFQLE1BQUE7O0FBR0csQ0FBQSxNQUFBLFFBQUEsQ0FBQSxDQUFBO0VBRUQsS0FBQSxDQUFNLENBQUEsTUFBTSxJQUFBLENBQUssYUFBTCxFQUFvQjtJQUM5QixJQUFBLENBQUssU0FBTDtJQUFnQixNQUFBLFFBQUEsQ0FBQSxDQUFBO0FBQ3BCLFVBQUEsTUFBQTtJQUFBLFVBQUE7SUFBQSxLQUFBO0lBQUE7TUFBTSxNQUFBLEdBQVMsWUFBQSxDQUFBO01BQ1QsS0FBQSxHQUFRLElBQUksS0FBSixDQUFBO01BQ1IsS0FBSyxDQUFDLEdBQU4sR0FBWSxDQUFBLE1BQU0sRUFBRSxDQUFDLFFBQUgsQ0FBWSxpQ0FBWixDQUFOO01BQ1osTUFBQSxHQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBZCxDQUFxQixDQUFFLE1BQUY7SUFBVSxLQUFWLENBQXJCO01BRVQsVUFBQSxHQUFhLENBQUMsQ0FBQyxVQUFGLENBQWE7UUFDeEIsTUFEd0I7UUFFeEIsVUFBQSxFQUFZLENBRlk7UUFHeEIsT0FBQSxFQUFTO01BSGUsQ0FBYjthQU1iLE1BQU0sQ0FBQyxTQUFQLENBQWlCLENBQUMsR0FBRDtJQUFNLEdBQU47SUFBVyxHQUFYLENBQWpCO0lBQW1DLFVBQVUsQ0FBQyxDQUFELENBQTdDO0lBWmMsQ0FBaEIsQ0FEOEI7R0FBcEIsQ0FBTixDQUFOO1NBZ0JBLE9BQU8sQ0FBQyxJQUFSLENBQWdCLE9BQUgsR0FBZ0IsQ0FBaEIsR0FBdUIsQ0FBcEM7QUFsQkMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInNvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3RlclwiXG5pbXBvcnQgYXNzZXJ0IGZyb20gXCJAZGFzaGtpdGUvYXNzZXJ0XCJcbmltcG9ydCB7IHRlc3QsIHN1Y2Nlc3MgfSBmcm9tIFwiQGRhc2hraXRlL2FtZW5cIlxuaW1wb3J0IHByaW50IGZyb20gXCJAZGFzaGtpdGUvYW1lbi1jb25zb2xlXCJcblxuaW1wb3J0IEZTIGZyb20gXCJub2RlOmZzL3Byb21pc2VzXCJcbmltcG9ydCB7IGNyZWF0ZUNhbnZhcywgSW1hZ2UgfSBmcm9tIFwiY2FudmFzXCJcbmltcG9ydCAqIGFzIFQgZnJvbSBcIi4uL3NyY1wiXG5cblxuZG8gLT5cblxuICBwcmludCBhd2FpdCB0ZXN0IFwiQ29sb3IgVGhpZWZcIiwgW1xuICAgIHRlc3QgXCJwYWxldHRlXCIsIC0+XG4gICAgICBjYW52YXMgPSBjcmVhdGVDYW52YXMoKVxuICAgICAgaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuICAgICAgaW1hZ2Uuc3JjID0gYXdhaXQgRlMucmVhZEZpbGUgXCJ0ZXN0L3N1bmZsb3dlci1hYXJvbi1idXJkZW4uanBnXCJcbiAgICAgIHNvdXJjZSA9IFQuQ2FudmFzSW1hZ2UuY3JlYXRlIHsgY2FudmFzLCBpbWFnZSB9XG5cbiAgICAgIGNvbG9yQXJyYXkgPSBULmdldFBhbGV0dGUgeyBcbiAgICAgICAgc291cmNlLCBcbiAgICAgICAgY29sb3JDb3VudDogNVxuICAgICAgICBxdWFsaXR5OiAxXG4gICAgICB9XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwgWzE4MSwgMTk2LCAyMjEgXSwgY29sb3JBcnJheVswXVxuICBdXG5cbiAgcHJvY2Vzcy5leGl0IGlmIHN1Y2Nlc3MgdGhlbiAwIGVsc2UgMVxuIl19
 //# sourceURL=/@dashkite/color-thief/test/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvY29sb3ItdGhpZWYvdGVzdC9pbmRleC5jb2ZmZWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwic291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyXCJcbmltcG9ydCBhc3NlcnQgZnJvbSBcIkBkYXNoa2l0ZS9hc3NlcnRcIlxuaW1wb3J0IHsgdGVzdCwgc3VjY2VzcyB9IGZyb20gXCJAZGFzaGtpdGUvYW1lblwiXG5pbXBvcnQgcHJpbnQgZnJvbSBcIkBkYXNoa2l0ZS9hbWVuLWNvbnNvbGVcIlxuXG5pbXBvcnQgRlMgZnJvbSBcIm5vZGU6ZnMvcHJvbWlzZXNcIlxuaW1wb3J0IHsgY3JlYXRlQ2FudmFzLCBJbWFnZSB9IGZyb20gXCJjYW52YXNcIlxuaW1wb3J0ICogYXMgVCBmcm9tIFwiLi4vc3JjXCJcblxuXG5kbyAtPlxuXG4gIHByaW50IGF3YWl0IHRlc3QgXCJDb2xvciBUaGllZlwiLCBbXG4gICAgdGVzdCBcInBhbGV0dGVcIiwgLT5cbiAgICAgIGNhbnZhcyA9IGNyZWF0ZUNhbnZhcygpXG4gICAgICBpbWFnZSA9IG5ldyBJbWFnZSgpXG4gICAgICBpbWFnZS5zcmMgPSBhd2FpdCBGUy5yZWFkRmlsZSBcInRlc3Qvc3VuZmxvd2VyLWFhcm9uLWJ1cmRlbi5qcGdcIlxuICAgICAgc291cmNlID0gVC5DYW52YXNJbWFnZS5jcmVhdGUgeyBjYW52YXMsIGltYWdlIH1cblxuICAgICAgY29sb3JBcnJheSA9IFQuZ2V0UGFsZXR0ZSB7IFxuICAgICAgICBzb3VyY2UsIFxuICAgICAgICBjb2xvckNvdW50OiA1XG4gICAgICAgIHF1YWxpdHk6IDFcbiAgICAgIH1cblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbCBbMTgxLCAxOTYsIDIyMSBdLCBjb2xvckFycmF5WzBdXG4gIF1cblxuICBwcm9jZXNzLmV4aXQgaWYgc3VjY2VzcyB0aGVuIDAgZWxzZSAxXG4iXSwibmFtZXMiOlsicHJpbnQiLCJ0ZXN0IiwiY2FudmFzIiwiY29sb3JBcnJheSIsImltYWdlIiwic291cmNlIiwiY3JlYXRlQ2FudmFzIiwiSW1hZ2UiLCJzcmMiLCJGUyIsInJlYWRGaWxlIiwiVCIsIkNhbnZhc0ltYWdlIiwiY3JlYXRlIiwiZ2V0UGFsZXR0ZSIsImNvbG9yQ291bnQiLCJxdWFsaXR5IiwiYXNzZXJ0IiwiZGVlcEVxdWFsIiwicHJvY2VzcyIsImV4aXQiLCJzdWNjZXNzIl0sIm1hcHBpbmdzIjoiOzs7O1FBQUE7K0RBQ0E7c0JBQ0E7b0VBQ0E7aUVBRUE7d0JBQ0E7NkRBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0csQ0FBQTtJQUVEQSxJQUFBQSxvQkFBQSxFQUFNLE1BQU1DLElBQUFBLFVBQUEsRUFBSyxlQUFlO1FBQzlCQSxJQUFBQSxVQUFBLEVBQUssV0FBVztZQUNwQixJQUFBQyxRQUFBQyxZQUFBQyxPQUFBQztZQUFNSCxTQUFTSSxJQUFBQSxvQkFBQTtZQUNURixRQUFRLElBQUlHLGFBQUo7WUFDUkgsTUFBTUksR0FBTixHQUFZLE1BQU1DLGlCQUFFLENBQUNDLFFBQUgsQ0FBWTtZQUM5QkwsU0FBU00sS0FBRUMsV0FBVyxDQUFDQyxNQUFkLENBQXFCO2dCQUFFWDtnQkFBUUU7WUFBVjtZQUU5QkQsYUFBYVEsS0FBRUcsVUFBRixDQUFhO2dCQUN4QlQ7Z0JBQ0FVLFlBQVk7Z0JBQ1pDLFNBQVM7WUFIZTttQkFNMUJDLGVBQU0sQ0FBQ0MsU0FBUCxDQUFpQjtnQkFBQztnQkFBSztnQkFBSzthQUE1QixFQUFtQ2YsVUFBVSxDQUFDLEVBQTlDO1FBWmM7S0FETjtXQWdCWmdCLFFBQVFDLElBQVIsQ0FBZ0JDLGFBQUgsR0FBZ0IsSUFBTztBQWxCbkMsQ0FBQSJ9