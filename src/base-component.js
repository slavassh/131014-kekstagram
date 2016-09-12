/**
 * Created by Viacheslav Shestakov on 11.09.2016.
 */
'use strict';

define(function() {
  var BaseComponent = function(baseData, baseElement) {
    this.data = baseData;
    console.dir(this.data);
    this.element = baseElement;
    console.dir(this.element);
  };

  BaseComponent.prototype.add = function() {
    this.data.appendChild(this.element);
    debugger;
  };

  BaseComponent.prototype.remove = function() {
    this.element.parentNode.removeChild(this.element);
    debugger;
  };

  return BaseComponent;
});
