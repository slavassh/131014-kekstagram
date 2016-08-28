/**
 * Created by Viacheslav Shestakov on 24.08.2016.
 */
'use strict';

define(function() {
  var IMAGE_LOAD_TIMEOUT = 10000;

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
  return getPictureElement;
});
