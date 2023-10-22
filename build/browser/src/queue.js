var Queue;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
Queue = function () {
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
}.call(this);
export { Queue };