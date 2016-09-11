/**
 * Created by Viacheslav Shestakov on 11.09.2016.
 */
'use strict';

define(function() {
  var inherit = function(childComponent, parentComponent) {
    var FictiveConstructor = function() {};
    FictiveConstructor.prototype = parentComponent.prototype;
    childComponent.prototype = new FictiveConstructor();
    childComponent.prototype.constructor = childComponent;
  };
  return inherit;
});
