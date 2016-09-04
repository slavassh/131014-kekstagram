/**
 * Created by Viacheslav Shestakov on 19.08.2016.
 */

'use strict';

define(['./load', './picture', './gallery'], function(load, Picture, Gallery) {
  var pictures = [];
  var filtersMenuForm = document.forms[0];
  var picturesContainer = document.querySelector('.pictures');
  var footer = document.querySelector('footer');
  var startPosition = 0;
  var pageSize = 12;
  var endPosition = 12;
  var currentFilter = 'filter-popular';
  var lastCall;

  var FULL_THROTTLE = 100;
  var GAP = 100;

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

  var toggleFilter = function(filterID) {
    picturesContainer.innerHTML = '';
    startPosition = 0;
    load('api/pictures', {
      from: startPosition,
      to: endPosition,
      filter: filterID}, addImageList);
  };

  filtersMenuForm.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('filters-item')) {
      toggleFilter(evt.target.htmlFor);
      console.log(evt.target.htmlFor);
      debugger;
    }
  });

  load('api/pictures', {
    from: startPosition,
    to: startPosition + pageSize,
    filter: currentFilter}, addImageList);

  window.addEventListener('scroll', function() {
    if(Date.now() - lastCall >= FULL_THROTTLE) {
      console.log('throttle');
      if(footer.getBoundingClientRect().bottom - window.innerHeight < GAP) {
        load('api/pictures', {
          from: startPosition += pageSize,
          to: endPosition += pageSize,
          filter: currentFilter}, addImageList);
      }
    }
    lastCall = Date.now();
  });

});



