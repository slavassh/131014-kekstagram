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

var addImageList = function(callData) {
  pictures = callData;

  filtersMenuForm.classList.add('hidden');

  pictures.forEach(function(picture) {
    var element = elemToClone.cloneNode(true);
    picturesContainer.appendChild(element);
    getPictureElement(picture, element);
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

var getPictureElement = function(data, elem) {
  var imgElem = elem.querySelector('img');
  var tileImage = new Image();
  var tileTimeout;

  tileImage.onload = function() {
    clearTimeout(tileTimeout);
    elem.replaceChild(tileImage, imgElem);
    tileImage.width = 182;
    tileImage.height = 182;
  };

  tileImage.onerror = function() {
    clearTimeout(tileTimeout);
    elem.classList.add('picture-load-failure');
  };

  tileImage.src = data.url;

  tileTimeout = setTimeout(function() {
    tileImage.src = '';
    elem.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return elem;
};

createCallback('api/pictures?callback=JSONPCallback', addImageList);




