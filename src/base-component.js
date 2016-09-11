/**
 * Created by Viacheslav Shestakov on 11.09.2016.
 */
'use strict';

define(function() {
  var BaseComponent = function(el) {
    this.element = el;
  };

  BaseComponent.prototype.remove = function() {
    this.element.parentNode.removeChild(this.element);
  };

  return BaseComponent;
});
