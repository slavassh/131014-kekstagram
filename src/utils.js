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

    throttle: function(func, ms) {

      var isThrottled = false,
        savedArgs,
        savedThis;

      function wrapper() {
        if (isThrottled) {
          savedArgs = arguments;
          savedThis = this;
          return;
        }

        func.apply(this, arguments);
        savedArgs = arguments;

        isThrottled = true;

        setTimeout(function() {
          isThrottled = false;
          if (savedArgs) {
            wrapper.apply(savedThis, savedArgs);
            savedArgs = savedThis = null;
          }
        }, ms);
      }

      return wrapper;
    }
  };
});
