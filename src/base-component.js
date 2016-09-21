/**
 * Created by Viacheslav Shestakov on 11.09.2016.
 */
'use strict';

define(function() {
  var BaseComponent = function(element) {
    this.element = element;
  };

  BaseComponent.prototype.addElement = function(container) {
    container.appendChild(this.element);
  };

  BaseComponent.prototype.removeElement = function() {
    this.element.parentNode.removeChild(this.element);
  };

  return BaseComponent;
});
