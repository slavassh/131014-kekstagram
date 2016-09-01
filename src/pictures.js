/**
 * Created by Viacheslav Shestakov on 19.08.2016.
 */

'use strict';

define(['./load', './picture', './gallery'], function(load, Picture, Gallery) {
  var pictures = [];
  var filtersMenuForm = document.forms[0];
  var picturesContainer = document.querySelector('.pictures');

  var addImageList = function(callData) {
    pictures = callData;

    filtersMenuForm.classList.add('hidden');

    pictures.forEach(function(picture, i) {
      var pictureElement = new Picture(picture, i);
      picturesContainer.appendChild(pictureElement.element);
    });

    filtersMenuForm.classList.remove('hidden');

    return Gallery.setPictures(pictures);
  };

  load('api/pictures?callback=JSONPCallback', addImageList);
});



