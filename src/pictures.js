/**
 * Created by Viacheslav Shestakov on 19.08.2016.
 */

'use strict';

var pictures = [];
var filtersMenuForm = document.forms[0];
var picturesContainer = document.querySelector('.pictures');
var elemTemplate = document.querySelector('#picture-template');

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

  filtersMenuForm.classList.remove('hidden');
};

var IMAGE_LOAD_TIMEOUT = 10000;

var elemToClone;

if ('content' in elemTemplate) {
  elemToClone = elemTemplate.content.querySelector('.picture');
} else {
  elemToClone = elemTemplate.querySelector('.picture');
}

var getPictureElement = function(data, container) {
  var elem = elemToClone.cloneNode(true);
  var imgElem = elem.querySelector('img');
  var tileImage = new Image();
  var tileTimeout;

  container.appendChild(elem);

  tileImage.onload = function() {
    clearTimeout(tileTimeout);
    imgElem.src = tileImage.src;
    imgElem.width = 182;
    imgElem.height = 182;
  };

  tileImage.onerror = function() {
    elem.classList.add('picture-load-failure');
  };

  tileImage.src = data.url;

  tileTimeout = setTimeout(function() {
    tileImage.src = '';
    elem.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return elem;
};

createCallback('api/pictures?callback=JSONPCallback', getData);



