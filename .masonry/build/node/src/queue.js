"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Queue", {
    enumerable: true,
    get: function() {
        return Queue;
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
var Queue;
Queue = (function() {
    class Queue {
        constructor({ compare: compare1 }){
            this.compare = compare1;
            this.items = [];
            this.sorted = false;
        }
        static create({ compare }) {
            return new Queue({
                compare
            });
        }
        sort() {
            if (this.sorted !== true) {
                this.items.sort(this.compare);
                return this.sorted = true;
            }
        }
        push(item) {
            this.items.push(item);
            return this.sorted = false;
        }
        peek(index) {
            this.sort();
            if (index == null) {
                index = this.items.length - 1;
            }
            return this.items[index];
        }
        pop() {
            this.sort();
            return this.items.pop();
        }
        map(f) {
            return this.items.map(f);
        }
        debug() {
            this.sort();
            return this.items;
        }
    }
    ;
    _metaclass.mixin(Queue.prototype, [
        _metaclass.getters({
            size: function() {
                return this.items.length;
            }
        })
    ]);
    Queue.isType = _type.isType(Queue);
    return Queue;
}).call(void 0);
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS9jb2xvci10aGllZi9zcmMvcXVldWUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUdNO0VBQU4sTUFBQSxNQUFBO0lBQ0UsV0FBYSxDQUFDO1FBQUc7TUFBSCxDQUFELENBQUE7TUFBRyxJQUFDLENBQUE7TUFDZixJQUFDLENBQUEsS0FBRCxHQUFTO01BQ1QsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUZDOztJQVNKLE9BQVIsTUFBUSxDQUFDLENBQUUsT0FBRixDQUFELENBQUE7YUFDUCxJQUFJLEtBQUosQ0FBVSxDQUFFLE9BQUYsQ0FBVjtJQURPOztJQUtULElBQU0sQ0FBQSxDQUFBO01BQ0osSUFBRyxJQUFDLENBQUEsTUFBRCxLQUFXLElBQWQ7UUFDRSxJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsQ0FBWSxJQUFDLENBQUEsT0FBYjtlQUNBLElBQUMsQ0FBQSxNQUFELEdBQVUsS0FGWjs7SUFESTs7SUFLTixJQUFNLENBQUUsSUFBRixDQUFBO01BQ0osSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQVksSUFBWjthQUNBLElBQUMsQ0FBQSxNQUFELEdBQVU7SUFGTjs7SUFJTixJQUFNLENBQUUsS0FBRixDQUFBO01BQ0osSUFBQyxDQUFBLElBQUQsQ0FBQTs7UUFDQSxRQUFTLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxHQUFnQjs7YUFDekIsSUFBQyxDQUFBLEtBQUssQ0FBRSxLQUFGO0lBSEY7O0lBS04sR0FBSyxDQUFBLENBQUE7TUFDSCxJQUFDLENBQUEsSUFBRCxDQUFBO2FBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQUE7SUFGRzs7SUFJTCxHQUFLLENBQUUsQ0FBRixDQUFBO2FBQ0gsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsQ0FBWDtJQURHOztJQUdMLEtBQU8sQ0FBQSxDQUFBO01BQ0wsSUFBQyxDQUFBLElBQUQsQ0FBQTthQUNBLElBQUMsQ0FBQTtJQUZJOztFQXBDVDs7RUFLRSxJQUFJLENBQUMsS0FBTCxDQUFXLEtBQUMsQ0FBQSxTQUFaLEVBQWdCO0lBQ2QsSUFBSSxDQUFDLE9BQUwsQ0FDRTtNQUFBLElBQUEsRUFBTSxRQUFBLENBQUEsQ0FBQTtlQUFHLElBQUMsQ0FBQSxLQUFLLENBQUM7TUFBVjtJQUFOLENBREYsQ0FEYztHQUFoQjs7RUFRQSxLQUFDLENBQUEsTUFBRCxHQUFTLElBQUksQ0FBQyxNQUFMLENBQVksS0FBWjs7Ozs7O0FBNEJYLE9BQUE7RUFBUyxLQUFUIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTWV0YSBmcm9tIFwiQGRhc2hraXRlL2pveS9tZXRhY2xhc3NcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcblxuXG5jbGFzcyBRdWV1ZVxuICBjb25zdHJ1Y3RvcjogKHsgQGNvbXBhcmUgfSkgLT5cbiAgICBAaXRlbXMgPSBbXVxuICAgIEBzb3J0ZWQgPSBmYWxzZVxuXG4gIE1ldGEubWl4aW4gQDo6LCBbXG4gICAgTWV0YS5nZXR0ZXJzXG4gICAgICBzaXplOiAtPiBAaXRlbXMubGVuZ3RoXG4gIF1cblxuICBAY3JlYXRlOiAoeyBjb21wYXJlIH0pIC0+XG4gICAgbmV3IFF1ZXVlKHsgY29tcGFyZSB9KVxuXG4gIEBpc1R5cGU6IFR5cGUuaXNUeXBlIEBcblxuICBzb3J0OiAtPlxuICAgIGlmIEBzb3J0ZWQgIT0gdHJ1ZVxuICAgICAgQGl0ZW1zLnNvcnQgQGNvbXBhcmVcbiAgICAgIEBzb3J0ZWQgPSB0cnVlXG5cbiAgcHVzaDogKCBpdGVtICkgLT5cbiAgICBAaXRlbXMucHVzaCBpdGVtXG4gICAgQHNvcnRlZCA9IGZhbHNlXG5cbiAgcGVlazogKCBpbmRleCApIC0+XG4gICAgQHNvcnQoKVxuICAgIGluZGV4ID89IEBpdGVtcy5sZW5ndGggLSAxXG4gICAgQGl0ZW1zWyBpbmRleCBdXG5cbiAgcG9wOiAtPlxuICAgIEBzb3J0KClcbiAgICBAaXRlbXMucG9wKClcblxuICBtYXA6ICggZiApIC0+XG4gICAgQGl0ZW1zLm1hcCBmXG5cbiAgZGVidWc6IC0+XG4gICAgQHNvcnQoKVxuICAgIEBpdGVtc1xuXG5cbmV4cG9ydCB7IFF1ZXVlIH0iXX0=
 //# sourceURL=/@dashkite/color-thief/src/queue.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvY29sb3ItdGhpZWYvc3JjL3F1ZXVlLmNvZmZlZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNZXRhIGZyb20gXCJAZGFzaGtpdGUvam95L21ldGFjbGFzc1wiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuXG5cbmNsYXNzIFF1ZXVlXG4gIGNvbnN0cnVjdG9yOiAoeyBAY29tcGFyZSB9KSAtPlxuICAgIEBpdGVtcyA9IFtdXG4gICAgQHNvcnRlZCA9IGZhbHNlXG5cbiAgTWV0YS5taXhpbiBAOjosIFtcbiAgICBNZXRhLmdldHRlcnNcbiAgICAgIHNpemU6IC0+IEBpdGVtcy5sZW5ndGhcbiAgXVxuXG4gIEBjcmVhdGU6ICh7IGNvbXBhcmUgfSkgLT5cbiAgICBuZXcgUXVldWUoeyBjb21wYXJlIH0pXG5cbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG4gIHNvcnQ6IC0+XG4gICAgaWYgQHNvcnRlZCAhPSB0cnVlXG4gICAgICBAaXRlbXMuc29ydCBAY29tcGFyZVxuICAgICAgQHNvcnRlZCA9IHRydWVcblxuICBwdXNoOiAoIGl0ZW0gKSAtPlxuICAgIEBpdGVtcy5wdXNoIGl0ZW1cbiAgICBAc29ydGVkID0gZmFsc2VcblxuICBwZWVrOiAoIGluZGV4ICkgLT5cbiAgICBAc29ydCgpXG4gICAgaW5kZXggPz0gQGl0ZW1zLmxlbmd0aCAtIDFcbiAgICBAaXRlbXNbIGluZGV4IF1cblxuICBwb3A6IC0+XG4gICAgQHNvcnQoKVxuICAgIEBpdGVtcy5wb3AoKVxuXG4gIG1hcDogKCBmICkgLT5cbiAgICBAaXRlbXMubWFwIGZcblxuICBkZWJ1ZzogLT5cbiAgICBAc29ydCgpXG4gICAgQGl0ZW1zXG5cblxuZXhwb3J0IHsgUXVldWUgfSJdLCJuYW1lcyI6WyJRdWV1ZSIsImNvbnN0cnVjdG9yIiwiY29tcGFyZSIsImNvbXBhcmUxIiwiaXRlbXMiLCJzb3J0ZWQiLCJjcmVhdGUiLCJzb3J0IiwicHVzaCIsIml0ZW0iLCJwZWVrIiwiaW5kZXgiLCJsZW5ndGgiLCJwb3AiLCJtYXAiLCJmIiwiZGVidWciLCJNZXRhIiwibWl4aW4iLCJwcm90b3R5cGUiLCJnZXR0ZXJzIiwic2l6ZSIsImlzVHlwZSIsIlR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7K0JBNkNTQTs7O2VBQUFBOzs7bUVBN0NUOzhEQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFEQSxJQUFBQTtBQUlNQSxRQUFBLENBQUE7SUFBTixNQUFBQTtRQUNFQyxZQUFjLEVBQUdDLFNBQUFDLFFBQUEsRUFBSixDQUFBO1lBQUcsSUFBQyxDQUFBRCxPQUFBLEdBQUFDO1lBQ2YsSUFBQyxDQUFBQyxLQUFELEdBQVMsRUFBQTtZQUNULElBQUMsQ0FBQUMsTUFBRCxHQUFVO1FBRkM7UUFTSixPQUFSQyxPQUFTLEVBQUVKLE9BQUYsRUFBRCxFQUFBO21CQUNQLElBQUlGLE1BQU07Z0JBQUVFO1lBQUY7UUFESDtRQUtUSyxPQUFNO1lBQ0osSUFBRyxJQUFDLENBQUFGLE1BQUQsS0FBVyxNQUFkO2dCQUNFLElBQUMsQ0FBQUQsS0FBSyxDQUFDRyxJQUFQLENBQVksSUFBQyxDQUFBTCxPQUFiO3VCQUNBLElBQUMsQ0FBQUcsTUFBRCxHQUFVOztRQUhSO1FBS05HLEtBQVFDLElBQUYsRUFBQTtZQUNKLElBQUMsQ0FBQUwsS0FBSyxDQUFDSSxJQUFQLENBQVlDO21CQUNaLElBQUMsQ0FBQUosTUFBRCxHQUFVO1FBRk47UUFJTkssS0FBUUMsS0FBRixFQUFBO1lBQ0osSUFBQyxDQUFBSixJQUFEOztnQkFDQUksUUFBUyxJQUFDLENBQUFQLEtBQUssQ0FBQ1EsTUFBUCxHQUFnQjs7bUJBQ3pCLElBQUMsQ0FBQVIsS0FBSyxDQUFFTyxNQUFGO1FBSEY7UUFLTkUsTUFBSztZQUNILElBQUMsQ0FBQU4sSUFBRDttQkFDQSxJQUFDLENBQUFILEtBQUssQ0FBQ1MsR0FBUDtRQUZHO1FBSUxDLElBQU9DLENBQUYsRUFBQTttQkFDSCxJQUFDLENBQUFYLEtBQUssQ0FBQ1UsR0FBUCxDQUFXQztRQURSO1FBR0xDLFFBQU87WUFDTCxJQUFDLENBQUFULElBQUQ7bUJBQ0EsSUFBQyxDQUFBSCxLQUFBO1FBRkk7SUFwQ1Q7O0lBS0VhLFdBQUtDLEtBQUwsQ0FBV2xCLE1BQUNtQixTQUFaLEVBQWdCO1FBQ2RGLFdBQUtHLE9BQUwsQ0FDRTtZQUFBQyxNQUFNO3VCQUFHLElBQUMsQ0FBQWpCLEtBQUssQ0FBQ1EsTUFBQTtZQUFWO1FBQU47S0FGSjtJQVFBWixNQUFDc0IsTUFBRCxHQUFTQyxNQUFLRCxNQUFMLENBQVl0QiJ9