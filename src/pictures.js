/**
 * Created by Viacheslav Shestakov on 19.08.2016.
 */

'use strict';

define(['./load', './picture'], function(load, getPicture) {
  var pictures = [];
  var filtersMenuForm = document.forms[0];
  var picturesContainer = document.querySelector('.pictures');

  var addImageList = function(callData) {
    pictures = callData;

    filtersMenuForm.classList.add('hidden');

    pictures.forEach(function(picture) {
      var element = elemToClone.cloneNode(true);
      picturesContainer.appendChild(element);
      getPicture(picture, element);
    });

    filtersMenuForm.classList.remove('hidden');
  };

  load('api/pictures?callback=JSONPCallback', addImageList);
});



