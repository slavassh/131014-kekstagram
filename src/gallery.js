/**
 * Created by Viacheslav Shestakov on 28.08.2016.
 */
'use strict';

define(function() {
  var Gallery = function() {
    this.galleryOverlay = document.querySelector('.gallery-overlay');
    this.galleryOverlayClose = document.querySelector('.gallery-overlay-close');
    this.galleryOverlayImage = document.querySelector('.gallery-overlay-image');

  };

  Gallery.prototype = {
    setPictures: function(picturesArr) {
      this.pictures = picturesArr;
      console.log(this.pictures);
    },
    show: function(activeNumber) {
      this.galleryOverlay.classList.remove('invisible');
      this.setActivePicture(activeNumber);
    },
    hide: function() {
      console.log(this.galleryOverlay);
    },
    setActivePicture: function(activeNumber) {
      this.activePicture = activeNumber;
      console.log(this.activePicture);
      debugger;
    }
  };

  return new Gallery();
});
