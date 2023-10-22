/*
Adapted from Protovis: http://mbostock.github.com/protovis/
Copyright 2010 Stanford Visualization Group
Licensed under the BSD License: http://www.opensource.org/licenses/bsd-license.php
*/
var map, max, naturalOrder, sum;
map = function (ax, f) {
  var object;
  object = {};
  if (f) {
    return ax.map(function (data, index) {
      object.index = index;
      return f.call(object, data);
    });
  } else {
    return ax.slice();
  }
};
naturalOrder = function (a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
};
sum = function (ax, f) {
  var g, object;
  object = {};
  if (f) {
    g = function (total, data, index) {
      object.index = index;
      return total + f.call(object, data);
    };
  } else {
    g = function (product, data) {
      return total + data;
    };
  }
  return ax.reduce(g, 0);
};
max = function (ax, f) {
  return Math.max.apply(null, f ? map(ax, f) : ax);
};
export { map, naturalOrder, sum, max };