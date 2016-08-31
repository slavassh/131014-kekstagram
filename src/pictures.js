/**
 * Created by Viacheslav Shestakov on 19.08.2016.
 */

'use strict';

define(['./load', './picture', './gallery'], function(load, Picture, Gallery) {
  var pictures = [];
  var filtersMenuForm = document.forms[0];
  var picturesContainer = document.querySelector('.pictures');
  var elemTemplate = document.querySelector('#picture-template');
  var elemToClone;

  if ('content' in elemTemplate) {
    elemToClone = elemTemplate.content.querySelector('.picture');
  } else {
    elemToClone = elemTemplate.querySelector('.picture');
  }

  var addImageList = function(callData) {
    pictures = callData;

    filtersMenuForm.classList.add('hidden');

    pictures.forEach(function(picture, i) {
      var element = elemToClone.cloneNode(true);
      picturesContainer.appendChild(element);
      element = new Picture(picture, element, i);
    });

    filtersMenuForm.classList.remove('hidden');

    return Gallery.setPictures(pictures);
  };

  load('api/pictures?callback=JSONPCallback', addImageList);
});



