/**
 * Created by Viacheslav Shestakov on 24.08.2016.
 */
'use strict';

define(function() {
  var IMAGE_LOAD_TIMEOUT = 10000;

  var elemTemplate = document.querySelector('#picture-template');
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
  return getPictureElement;
});
