/**
 * Created by Viacheslav Shestakov on 19.08.2016.
 */

'use strict';

define(['./load', './picture', './gallery'], function(load, Picture, Gallery) {
  var pictures = [];
  var filtersMenuForm = document.forms[0];
  var picturesContainer = document.querySelector('.pictures');
  var footer = document.querySelector('footer');
  var pageNumber = 0;
  var pageSize = 12;
  var currentFilter = 'filter-popular';
  var lastCall = Date.now();

  var FULL_THROTTLE = 100;
  var GAP = 100;
  var LOAD_URL = 'api/pictures';

  var loadOnScroll = function() {
    if(Date.now() - lastCall >= FULL_THROTTLE) {
      if(footer.getBoundingClientRect().bottom - window.innerHeight <= GAP) {
        loadPictures(pageNumber, currentFilter);
        console.log('scroll');
      }
      lastCall = Date.now();
      console.log('scroll2');
    }
  };

  var addImageList = function(callData) {
    pictures = callData;

    pictures.forEach(function(picture, i) {
      var pictureElement = new Picture(picture, i);
      picturesContainer.appendChild(pictureElement.element);
    });

    console.log(pictures.length);


    if(pictures.length < pageSize) {
      window.removeEventListener('scroll', loadOnScroll);
    }
    return Gallery.setPictures(pictures);
  };

  var loadPictures = function(loadPageNumber, loadFilter) {
    pageNumber++;
    return load(LOAD_URL, {
      from: loadPageNumber * pageSize,
      to: loadPageNumber * pageSize + pageSize,
      filter: loadFilter}, addImageList);
  };

  var renderList = function() {
    filtersMenuForm.classList.add('hidden');
    loadPictures(pageNumber, currentFilter);
    filtersMenuForm.classList.remove('hidden');
    window.addEventListener('scroll', loadOnScroll);
  };


  var toggleFilter = function(filterID) {
    picturesContainer.innerHTML = '';
    pageNumber = 0;
    currentFilter = filterID;
    return loadPictures(pageNumber, currentFilter);
  };

  filtersMenuForm.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('filters-item')) {
      toggleFilter(evt.target.htmlFor);
    }
  });

  return renderList();
});



