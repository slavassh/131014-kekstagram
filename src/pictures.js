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
  var lastPage = pageSize;

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

  var getPicturesElements = function(picturesData) {
    picturesData.forEach(function(picture, i) {
      var pictureElement = new Picture(picture, i);
      picturesContainer.appendChild(pictureElement.element);
    });
    return Gallery.setPictures(pictures);
  };

  var addImageList = function(callData) {
    pictures = callData;

    filtersMenuForm.classList.add('hidden');

    getPicturesElements(pictures);

    lastPage = pictures.length;

    console.log(pictures.length);

    window.addEventListener('scroll', loadOnScroll);

    if(pictures.length < pageSize) {
      window.removeEventListener('scroll', loadOnScroll);
    }

    filtersMenuForm.classList.remove('hidden');
  };

  var loadPictures = function(loadPageNumber, loadFilter) {
    pageNumber++;
    return load(LOAD_URL, {
      from: loadPageNumber * pageSize,
      to: loadPageNumber * pageSize + pageSize,
      filter: loadFilter}, addImageList);
  };

  var toggleFilter = function(filterID) {
    picturesContainer.innerHTML = '';
    pageNumber = 0;
    currentFilter = filterID;
    loadPictures(pageNumber, currentFilter);
  };

  filtersMenuForm.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('filters-item')) {
      toggleFilter(evt.target.htmlFor);
    }
  });

  var loadFullHeight = function() {
    // while (lastPage === pageSize) {
      loadPictures(pageNumber, currentFilter);
      console.log('load');
    // }
  };
  loadFullHeight();
});



