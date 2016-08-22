/**
 * Created by Viacheslav Shestakov on 19.08.2016.
 */

'use strict';

var pictures = [];
var filtersMenuForm = document.forms[0];
console.log(filtersMenuForm);
debugger;

var picturesContainer = document.querySelector('.pictures');
var elemTemplate = document.querySelector('#picture-template');
console.log(elemTemplate);

var createCallback = function(src, func) {
  var elemScript = document.createElement('script');
  elemScript.src = src;
  document.body.appendChild(elemScript);

  window.JSONPCallback = function(data) {
    pictures = func(data);
  };
};

var getData = function(callData) {
  pictures = callData;

  filtersMenuForm.classList.add('hidden');

  pictures.forEach(function(picture) {
    getPictureElement(picture, picturesContainer);
  });

  return pictures;
};

function createPhoto() {
  createCallback('api/pictures?callback=JSONPCallback', getData);
  console.log(pictures);
  debugger;
}
createPhoto();

var elemToClone;

if ('content' in elemTemplate) {
  elemToClone = elemTemplate.content.querySelector('.picture');
} else {
  elemToClone = elemTemplate.querySelector('.picture');
}

var getPictureElement = function(data, container) {
  var elem = elemToClone.cloneNode(true);
  container.appendChild(elem);
  return elem;
  console.log(elem);
};




