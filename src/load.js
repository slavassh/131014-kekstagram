/**
 * Created by Viacheslav Shestakov on 24.08.2016.
 */
'use strict';

define(function() {
  var getPicturesData = function(url, options, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function(evt) {
      console.log(evt);
      var data = JSON.parse(evt.target.response);
      return callback(data);
    };

    xhr.open('GET', url +
      '?from=' + (options.from || 0) +
      '&to=' + (options.to || Infinity) +
      '&filter=' + (options.filter || 'default'));
    xhr.send();
    console.log(url +
      '?from=' + (options.from || 0) +
      '&?to=' + (options.to || Infinity) +
      '&?filter=' + (options.filter || 'default'));
    debugger;
  };
  return getPicturesData;
});
