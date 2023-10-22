"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Queue = void 0;
var Meta = _interopRequireWildcard(require("@dashkite/joy/metaclass"));
var Type = _interopRequireWildcard(require("@dashkite/joy/type"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var Queue;
exports.Queue = Queue = function () {
  class Queue {
    constructor({
      compare: compare1
    }) {
      this.compare = compare1;
      this.items = [];
      this.sorted = false;
    }
    static create({
      compare
    }) {
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
  Meta.mixin(Queue.prototype, [Meta.getters({
    size: function () {
      return this.items.length;
    }
  })]);
  Queue.isType = Type.isType(Queue);
  return Queue;
}.call(void 0);
//# sourceMappingURL=data:application/json;base64,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LElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLENBQVgsQ0FBQTtJQURHO0lBR0wsS0FBTyxDQUFBLEVBQUE7TUFDTCxJQUFDLENBQUEsSUFBRCxDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsS0FBQTtJQUZJO0VBcENUO0VBQUE7RUFLRSxJQUFJLENBQUMsS0FBTCxDQUFXLEtBQUMsQ0FBQSxTQUFaLEVBQWdCLENBQ2QsSUFBSSxDQUFDLE9BQUwsQ0FDRTtJQUFBLElBQUEsRUFBTSxTQUFBLENBQUEsRUFBQTthQUFHLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBQTtJQUFWO0VBQU4sQ0FERixDQURjLENBQWhCLENBQUE7RUFRQSxLQUFDLENBQUEsTUFBRCxHQUFTLElBQUksQ0FBQyxNQUFMLENBQVksS0FBWixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTWV0YSBmcm9tIFwiQGRhc2hraXRlL2pveS9tZXRhY2xhc3NcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcblxuXG5jbGFzcyBRdWV1ZVxuICBjb25zdHJ1Y3RvcjogKHsgQGNvbXBhcmUgfSkgLT5cbiAgICBAaXRlbXMgPSBbXVxuICAgIEBzb3J0ZWQgPSBmYWxzZVxuXG4gIE1ldGEubWl4aW4gQDo6LCBbXG4gICAgTWV0YS5nZXR0ZXJzXG4gICAgICBzaXplOiAtPiBAaXRlbXMubGVuZ3RoXG4gIF1cblxuICBAY3JlYXRlOiAoeyBjb21wYXJlIH0pIC0+XG4gICAgbmV3IFF1ZXVlKHsgY29tcGFyZSB9KVxuXG4gIEBpc1R5cGU6IFR5cGUuaXNUeXBlIEBcblxuICBzb3J0OiAtPlxuICAgIGlmIEBzb3J0ZWQgIT0gdHJ1ZVxuICAgICAgQGl0ZW1zLnNvcnQgQGNvbXBhcmVcbiAgICAgIEBzb3J0ZWQgPSB0cnVlXG5cbiAgcHVzaDogKCBpdGVtICkgLT5cbiAgICBAaXRlbXMucHVzaCBpdGVtXG4gICAgQHNvcnRlZCA9IGZhbHNlXG5cbiAgcGVlazogKCBpbmRleCApIC0+XG4gICAgQHNvcnQoKVxuICAgIGluZGV4ID89IEBpdGVtcy5sZW5ndGggLSAxXG4gICAgQGl0ZW1zWyBpbmRleCBdXG5cbiAgcG9wOiAtPlxuICAgIEBzb3J0KClcbiAgICBAaXRlbXMucG9wKClcblxuICBtYXA6ICggZiApIC0+XG4gICAgQGl0ZW1zLm1hcCBmXG5cbiAgZGVidWc6IC0+XG4gICAgQHNvcnQoKVxuICAgIEBpdGVtc1xuXG5cbmV4cG9ydCB7IFF1ZXVlIH0iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=src/queue.coffee