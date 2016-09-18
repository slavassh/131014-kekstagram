/**
 * Created by Viacheslav Shestakov on 19.08.2016.
 */

'use strict';

define(['./load', './picture', './gallery', './picture-data'], function(load, Picture, Gallery, PictureData) {
  var pictures = [];
  var filtersMenuForm = document.forms[0];
  var picturesContainer = document.querySelector('.pictures');
  var footer = document.querySelector('footer');
  var pageNumber;
  var pageSize = 12;
  var currentFilter;

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
    if(footer.getBoundingClientRect().bottom - window.innerHeight <= GAP) {
      loadPictures(pageNumber, currentFilter);
    }
  };

  var throttle = function(optimizedFunction, interval) {
    var referenceTime = Date.now();

    return function() {
      var lastCall = Date.now();
      if (lastCall - referenceTime >= interval) {
        optimizedFunction();
        referenceTime = Date.now();
      }
    };
  };

  var optimizedScroll = throttle(loadOnScroll, FULL_THROTTLE);

  var loadToFullPage = function() {
    if(!(isNextPageAvailable()) && footer.getBoundingClientRect().bottom - window.innerHeight <= 0) {
      loadPictures(pageNumber, currentFilter);
    }
  };

  var addImageList = function(callData) {
    pictures = callData;

    pictures.forEach(function(item) {
      var pictureElementData = new PictureData(item);
      var pictureElement = new Picture(allPictures.length, pictureElementData);
      pictureElement.addElement(picturesContainer);
      allPictures.push(pictureElement);
    });

    if(isNextPageAvailable()) {
      window.removeEventListener('scroll', optimizedScroll);
    }
    loadToFullPage();
    Gallery.setPictures(allPictures);
    return Gallery.restoreFromHash();
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
    window.addEventListener('scroll', optimizedScroll);
    filtersMenuForm.classList.remove('hidden');
  };

  return setCurrentFilter();
});



