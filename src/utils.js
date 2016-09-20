/**
 * Created by Viacheslav Shestakov on 11.09.2016.
 */
'use strict';

define(function() {
  return {
    inherit: function(childComponent, parentComponent) {
      var FictiveConstructor = function() {};
      FictiveConstructor.prototype = parentComponent.prototype;
      childComponent.prototype = new FictiveConstructor();
      childComponent.prototype.constructor = childComponent;
    },
    storageAvailable: function(type) {
      try {
        var storage = window[type],
          x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
      } catch(e) {
        return false;
      }
    },
    throttle: function(optimizedFunction, interval) {
      var referenceTime = Date.now();

      return function() {
        var lastCall = Date.now();
        if (lastCall - referenceTime >= interval) {
          optimizedFunction();
          referenceTime = Date.now();
        }
      };
    }
  };
});
