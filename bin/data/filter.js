'use strict';

module.exports = function(list, filterID) {
  switch (filterID) {
    case 'filter-popular':
      return list;

    case 'filter-new':
      return list.sort(function(a, b) {
        return a.created - b.created;
      });

    case 'filter-discussed':
      return list.sort(function(a, b) {
        return a.comments - b.comments;
      });
  }
  return list;
};
