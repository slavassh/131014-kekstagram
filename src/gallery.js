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
    this.onChangeHash = this.onChangeHash.bind(this);
    window.addEventListener('hashchange', this.onChangeHash);
  };

  Gallery.prototype.setPictures = function(picturesArr) {
    this.pictures = picturesArr;
  };

  Gallery.prototype.onChangeHash = function() {
    this.restoreFromHash();
  };

  Gallery.prototype.restoreFromHash = function() {
    if ((/#photo\/(\S+)/).test(location.hash)) {
      this.setActivePicture(location.hash.match(/#photo\/(\S+)/)[1]);
      this.show();
    } else if (!location.hash && !this.galleryOverlay.classList.contains('invisible')) {
      this.hide();
    }
  };

  Gallery.prototype.show = function() {
    this.galleryOverlayImage.src = this.pictures[this.activePicture].data.getUrl();
    this.commentsCount.textContent = this.pictures[this.activePicture].data.getCommentsCount();
    this.updateGalleryLike();
    this.galleryOverlay.classList.remove('invisible');
    this.likesCount.addEventListener('click', this.onLikesClick);
    this.galleryOverlayImage.addEventListener('click', this.onImageClick);
    this.galleryOverlayClose.addEventListener('click', this.onCloseClick);
  };

  Gallery.prototype.hide = function() {
    this.galleryOverlay.classList.add('invisible');
    this.likesCount.removeEventListener('click', this.onLikesClick);
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

  Gallery.prototype.setActivePicture = function(activeItem) {
    if(typeof activeItem === 'number') {
      this.activePicture = activeItem;
    } else {
      this.filtredItem = this.pictures.filter(function(item) {
        return item.data.getUrl() === activeItem;
      });
      if(this.filtredItem.length > 0) {
        this.activePicture = this.filtredItem[0].activePicture;
      } else {
        this.clearHash();
      }
    }
  };

  Gallery.prototype.pictureIncrement = function() {
    this.activePicture++;
    if(this.activePicture >= this.pictures.length) {
      this.activePicture = 0;
    }
  };

  Gallery.prototype.onImageClick = function() {
    this.pictureIncrement();
    while(this.pictures[this.activePicture].element.classList.contains('picture-load-failure')) {
      this.pictureIncrement();
    }

    location.hash = '#photo/' + this.pictures[this.activePicture].data.getUrl();
  };

  Gallery.prototype.onLikesClick = function() {
    this.pictures[this.activePicture].data.setLikes();
    this.updateGalleryLike();
    this.pictures[this.activePicture].updateLikeCount();
  };

  Gallery.prototype.onCloseClick = function() {
    this.clearHash();
  };

  Gallery.prototype.clearHash = function() {
    location.hash = '';
  };

  return new Gallery();
});
