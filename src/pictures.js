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
  var pageSize = 4;
  var currentFilter = 'filter-popular';
  var lastCall = Date.now();
  var allPictures = [];

  var FULL_THROTTLE = 100;
  var GAP = 100;
  var LOAD_URL = 'api/pictures';

  var loadOnScroll = function() {
    if(Date.now() - lastCall >= FULL_THROTTLE) {
      if(footer.getBoundingClientRect().bottom - window.innerHeight <= GAP) {
        loadPictures(pageNumber, currentFilter);
      }
      lastCall = Date.now();
    }
  };

  var loadToFullPage = function() {
    if(!(isNextPageAvailable()) && footer.getBoundingClientRect().bottom - window.innerHeight <= 0) {
      loadPictures(pageNumber, currentFilter);
    }
  };

  var addImageList = function(callData) {
    pictures = callData;

    pictures.forEach(function(item) {
      var pictureElement = new Picture(item, allPictures.length);
      picturesContainer.appendChild(pictureElement.element);
      allPictures.push(item);
    });

    if(isNextPageAvailable()) {
      window.removeEventListener('scroll', loadOnScroll);
    }
    loadToFullPage();

    return Gallery.setPictures(allPictures);
  };

  var isNextPageAvailable = function() {
    return pictures.length < pageSize;
  };

  var loadPictures = function(loadPageNumber, loadFilter) {
    pageNumber++;
    load(LOAD_URL, {
      from: loadPageNumber * pageSize,
      to: loadPageNumber * pageSize + pageSize,
      filter: loadFilter}, addImageList);
  };

  var toggleFilter = function(filterID) {
    picturesContainer.innerHTML = '';
    allPictures = [];
    pageNumber = 0;
    currentFilter = filterID;
    loadPictures(pageNumber, currentFilter);
    window.addEventListener('scroll', loadOnScroll);
  };

  filtersMenuForm.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('filters-item')) {
      toggleFilter(evt.target.htmlFor);
    }
  });

  var renderList = function() {
    filtersMenuForm.classList.add('hidden');
    loadPictures(pageNumber, currentFilter);
    window.addEventListener('scroll', loadOnScroll);
    filtersMenuForm.classList.remove('hidden');
  };

  renderList();
});



