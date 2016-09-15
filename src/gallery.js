/**
 * Created by Viacheslav Shestakov on 28.08.2016.
 */
'use strict';

define(['./utils', './base-component'], function() {
  var Gallery = function() {
    this.galleryOverlay = document.querySelector('.gallery-overlay');
    this.galleryOverlayClose = this.galleryOverlay.querySelector('.gallery-overlay-close');
    this.galleryOverlayImage = this.galleryOverlay.querySelector('.gallery-overlay-image');
    this.commentsCount = this.galleryOverlay.querySelector('.comments-count');
    this.likesCount = this.galleryOverlay.querySelector('.likes-count');
    this.onLikesClick = this.onLikesClick.bind(this);
    this.onImageClick = this.onImageClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
  };

  Gallery.prototype.setPictures = function(picturesArr) {
    this.pictures = picturesArr;
  };

  Gallery.prototype.show = function() {
    this.galleryOverlay.classList.remove('invisible');
    this.likesCount.addEventListener('click', this.onLikesClick);
    this.galleryOverlayImage.addEventListener('click', this.onImageClick);
    this.galleryOverlayClose.addEventListener('click', this.onCloseClick);
  };

  Gallery.prototype.hide = function() {
    this.galleryOverlay.classList.add('invisible');
    this.likesCount.addEventListener('click', this.onLikesClick);
    this.galleryOverlayImage.removeEventListener('click', this.onImageClick);
    this.galleryOverlayClose.removeEventListener('click', this.onCloseClick);
  };

  Gallery.prototype.updateGalleryLike = function() {
    this.likeState = this.pictures[this.activePicture].data.getLikeState();
    this.likesCount.textContent = this.pictures[this.activePicture].data.getLikesCount();
    if(this.likeState && !this.likesCount.classList.contains('likes-count-liked')) {
      this.likesCount.classList.add('likes-count-liked');
    } else if (!this.likeState && this.likesCount.classList.contains('likes-count-liked')) {
      this.likesCount.classList.remove('likes-count-liked');
    }
  };

  Gallery.prototype.setActivePicture = function(activeNumber) {
    this.activePicture = activeNumber;
    this.galleryOverlayImage.src = this.pictures[this.activePicture].data.getUrl();
    this.commentsCount.textContent = this.pictures[this.activePicture].data.getCommentsCount();
    this.updateGalleryLike();
  };

  Gallery.prototype.onImageClick = function() {
    if(this.activePicture < this.pictures.length - 1) {
      this.setActivePicture(this.activePicture + 1);
    } else {
      this.setActivePicture(0);
    }
  };

  Gallery.prototype.onLikesClick = function() {
    this.pictures[this.activePicture].data.setLikes();
    this.updateGalleryLike();
    this.pictures[this.activePicture].updateLikeCount();
  };

  Gallery.prototype.onCloseClick = function() {
    this.hide();
  };

  return new Gallery();
});
