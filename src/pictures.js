/**
 * Created by Viacheslav Shestakov on 19.08.2016.
 */

'use strict';

var pictures = [];

var getData = function(callData) {
  return callData;
};

var createCallback = function(src, func) {
  var elemScript = document.createElement('script');
  elemScript.src = src;
  document.body.appendChild(elemScript);

  window.JSONPCallback = function(data) {
    pictures = func(data);
    return pictures;
  };
};

createCallback('api/pictures?callback=JSONPCallback', getData);
