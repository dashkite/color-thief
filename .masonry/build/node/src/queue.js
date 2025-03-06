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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlcyI6WyIvQGRhc2hraXRlL2NvbG9yLXRoaWVmL3NyYy9xdWV1ZS5jb2ZmZWUiXSwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE1ldGEgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvbWV0YWNsYXNzXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5cblxuY2xhc3MgUXVldWVcbiAgY29uc3RydWN0b3I6ICh7IEBjb21wYXJlIH0pIC0+XG4gICAgQGl0ZW1zID0gW11cbiAgICBAc29ydGVkID0gZmFsc2VcblxuICBNZXRhLm1peGluIEA6OiwgW1xuICAgIE1ldGEuZ2V0dGVyc1xuICAgICAgc2l6ZTogLT4gQGl0ZW1zLmxlbmd0aFxuICBdXG5cbiAgQGNyZWF0ZTogKHsgY29tcGFyZSB9KSAtPlxuICAgIG5ldyBRdWV1ZSh7IGNvbXBhcmUgfSlcblxuICBAaXNUeXBlOiBUeXBlLmlzVHlwZSBAXG5cbiAgc29ydDogLT5cbiAgICBpZiBAc29ydGVkICE9IHRydWVcbiAgICAgIEBpdGVtcy5zb3J0IEBjb21wYXJlXG4gICAgICBAc29ydGVkID0gdHJ1ZVxuXG4gIHB1c2g6ICggaXRlbSApIC0+XG4gICAgQGl0ZW1zLnB1c2ggaXRlbVxuICAgIEBzb3J0ZWQgPSBmYWxzZVxuXG4gIHBlZWs6ICggaW5kZXggKSAtPlxuICAgIEBzb3J0KClcbiAgICBpbmRleCA/PSBAaXRlbXMubGVuZ3RoIC0gMVxuICAgIEBpdGVtc1sgaW5kZXggXVxuXG4gIHBvcDogLT5cbiAgICBAc29ydCgpXG4gICAgQGl0ZW1zLnBvcCgpXG5cbiAgbWFwOiAoIGYgKSAtPlxuICAgIEBpdGVtcy5tYXAgZlxuXG4gIGRlYnVnOiAtPlxuICAgIEBzb3J0KClcbiAgICBAaXRlbXNcblxuXG5leHBvcnQgeyBRdWV1ZSB9Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7K0JBNkNTLEtBQVQ7Ozs7OzttRUE3Q0E7OERBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQURBLElBQUE7QUFJTSxRQUFBLENBQUE7SUFBTixNQUFBLE1BQUE7UUFDRSxXQUFhLENBQUMsRUFBRyxTQUFBLFFBQUEsRUFBSixDQUFBO1lBQUcsSUFBQyxDQUFBLE9BQUEsR0FBQTtZQUNmLElBQUMsQ0FBQSxLQUFELEdBQVMsRUFBQTtZQUNULElBQUMsQ0FBQSxNQUFELEdBQVU7UUFGQztRQVNKLE9BQVIsTUFBUSxDQUFDLEVBQUUsT0FBRixFQUFELENBQUEsQ0FBQTttQkFDUCxJQUFJLEtBQUosQ0FBVTtnQkFBRTtZQUFGLENBQVY7UUFETztRQUtULElBQU0sQ0FBQSxDQUFBLENBQUE7WUFDSixJQUFHLElBQUMsQ0FBQSxNQUFELEtBQVcsSUFBZCxFQUFBO2dCQUNFLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFZLElBQUMsQ0FBQSxPQUFiO3VCQUNBLElBQUMsQ0FBQSxNQUFELEdBQVUsS0FGWjs7UUFESTtRQUtOLElBQU0sQ0FBRSxJQUFGLENBQUEsQ0FBQTtZQUNKLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFZLElBQVo7bUJBQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVTtRQUZOO1FBSU4sSUFBTSxDQUFFLEtBQUYsQ0FBQSxDQUFBO1lBQ0osSUFBQyxDQUFBLElBQUQsQ0FBQTs7Z0JBQ0EsUUFBUyxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsR0FBZ0I7O21CQUN6QixJQUFDLENBQUEsS0FBSyxDQUFFLEtBQUYsQ0FBQTtRQUhGO1FBS04sR0FBSyxDQUFBLENBQUEsQ0FBQTtZQUNILElBQUMsQ0FBQSxJQUFELENBQUE7bUJBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQUE7UUFGRztRQUlMLEdBQUssQ0FBRSxDQUFGLENBQUEsQ0FBQTttQkFDSCxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxDQUFYO1FBREc7UUFHTCxLQUFPLENBQUEsQ0FBQSxDQUFBO1lBQ0wsSUFBQyxDQUFBLElBQUQsQ0FBQTttQkFDQSxJQUFDLENBQUEsS0FBQTtRQUZJO0lBcENUOztJQUtFLElBQUksT0FBQyxLQUFMLENBQVcsS0FBQyxDQUFBLFNBQVosRUFBZ0I7UUFDZCxJQUFJLE9BQUMsT0FBTCxDQUNFO1lBQUEsSUFBQSxFQUFNLFFBQUEsQ0FBQSxDQUFBO3VCQUFHLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBQTtZQUFWO1FBQU4sQ0FERixDQURjO0tBQWhCO0lBUUEsS0FBQyxDQUFBLE1BQUQsR0FBUyxJQUFJLEVBQUMsTUFBTCxDQUFZLEtBQVoifQ==