/**
 * Created by Viacheslav Shestakov on 19.08.2016.
 */

'use strict';

define(['./load', './picture', './gallery'], function(load, Picture, Gallery) {
  var pictures = [];
  var filtersMenuForm = document.forms[0];
  var picturesContainer = document.querySelector('.pictures');
  var footer = document.querySelector('footer');
  var pageNumber;
  var pageSize = 12;
  var currentFilter;
  var lastCall = Date.now();
  var storageFilter = localStorage;
  var allPictures;

  var DEFAULT_FILTER = 'filter-popular';
  var FULL_THROTTLE = 100;
  var GAP = 100;
  var LOAD_URL = 'api/pictures';
  var STORAGE_PROPERTY_NAME = 'filter';

  var setCurrentFilter = function() {
    if(!storageFilter.getItem(STORAGE_PROPERTY_NAME)) {
      currentFilter = DEFAULT_FILTER;
    } else {
      currentFilter = storageFilter.getItem(STORAGE_PROPERTY_NAME);
      filtersMenuForm.elements[currentFilter].checked = true;
    }
    return renderList();
  };

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
      var pictureElement = new Picture(item, picturesContainer, allPictures.length);
      console.log('item');
      console.dir(item);
      pictureElement.addElement();
      console.log('pictureElement.element:');
      console.dir(pictureElement.element);
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

  filtersMenuForm.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('filters-radio')) {
      currentFilter = evt.target.id;
      storageFilter.setItem(STORAGE_PROPERTY_NAME, currentFilter);
      renderList();
    }
  });

  var renderList = function() {
    picturesContainer.innerHTML = '';
    allPictures = [];
    pageNumber = 0;

    filtersMenuForm.classList.add('hidden');
    loadPictures(pageNumber, currentFilter);
    window.addEventListener('scroll', loadOnScroll);
    filtersMenuForm.classList.remove('hidden');
  };

  return setCurrentFilter();
});



