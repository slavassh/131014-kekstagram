/**
 * Created by Viacheslav Shestakov on 24.08.2016.
 */
'use strict';

define(function() {
  var getPicturesData = function(url, options, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function(evt) {
      var data = JSON.parse(evt.target.response);
      return callback(data);
    };

    xhr.open('GET', url +
      '?from=' + (options.from || 0) +
      '&to=' + (options.to || Infinity) +
      '&filter=' + (options.filter || 'filter-popular'));
    xhr.send();
  };
  return getPicturesData;
});
