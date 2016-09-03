'use strict';

module.exports = function(list, from, to) {
  var filterList = list.slice(from, to);
  return filterList;
};
