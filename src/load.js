/**
 * Created by Viacheslav Shestakov on 24.08.2016.
 */
'use strict';

define(function() {
  var createCallback = function(src, func) {
    var elemScript = document.createElement('script');
    elemScript.src = src;
    document.body.appendChild(elemScript);

    window.JSONPCallback = function(data) {
      return func(data);
    };
  };
  return createCallback;
});
