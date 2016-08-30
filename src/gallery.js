/**
 * Created by Viacheslav Shestakov on 28.08.2016.
 */
'use strict';

define(function() {
  var Gallery = function() {
    var self = this;
    this.galleryOverlay = document.querySelector('.gallery-overlay');
    this.galleryOverlayClose = document.querySelector('.gallery-overlay-close');
    this.galleryOverlayImage = document.querySelector('.gallery-overlay-image');
    this.commentsCount = document.querySelector('.comments-count');
    this.likesCount = document.querySelector('.likes-count');

    this.galleryOverlayImage.onclick = function() {
      self.onImageClick();
    };

    this.galleryOverlayClose.onclick = function() {
      self.onCloseClick();
    };
  };

  Gallery.prototype.setPictures = function(picturesArr) {
    this.pictures = picturesArr;
  };

  Gallery.prototype.show = function(activeNumber) {
    this.galleryOverlay.classList.remove('invisible');
    this.setActivePicture(activeNumber);
  };

  Gallery.prototype.hide = function() {
    this.galleryOverlay.classList.add('invisible');
  };

  Gallery.prototype.setActivePicture = function(activeNumber) {
    this.activePicture = activeNumber;
    this.galleryOverlayImage.src = this.pictures[this.activePicture].url;
    this.commentsCount.textContent = this.pictures[this.activePicture].comments;
    this.likesCount.textContent = this.pictures[this.activePicture].likes;
  };

  Gallery.prototype.onImageClick = function() {
    if(this.activePicture < this.pictures.length - 1) {
      this.setActivePicture(this.activePicture + 1);
    } else {
      this.setActivePicture(0);
    }
  };

  Gallery.prototype.onCloseClick = function() {
    this.hide();
  };

  return new Gallery();
});
