/**
 * Created by Viacheslav Shestakov on 11.09.2016.
 */
'use strict';

define(function() {
  var BaseComponent = function(baseElement, baseContainer) {
    this.element = baseElement;
    console.log('Base.Element:');
    console.dir(this.element);
    this.container = baseContainer;
    console.log('this.container');
    console.dir(this.container);
  };

  BaseComponent.prototype.addElement = function() {
    this.container.appendChild(this.element);
  };

  BaseComponent.prototype.remove = function() {
    this.element.parentNode.removeChild(this.element);
    debugger;
  };

  return BaseComponent;
});
