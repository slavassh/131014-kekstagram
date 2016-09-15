'use strict';

module.exports = function(list, filterID) {
  switch (filterID) {
    case 'filter-popular':
      return list;

    case 'filter-new':
      return list.filter(function(item) {
        return item.created > Date.now() - 1000 * 60 * 60 * 24 * 3;
      }).sort(function(a, b) {
        return b.created - a.created;
      });

    case 'filter-discussed':
      return list.sort(function(a, b) {
        return b.comments - a.comments;
      });
  }
};
