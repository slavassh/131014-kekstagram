/**
 * Created by Viacheslav Shestakov on 24.08.2016.
 */
'use strict';

define(['./gallery', './utils', './base-component'], function(Gallery, utils, BaseComponent) {
  var Picture = function(activeNumber, pictureData) {

    this.data = pictureData;

    var IMAGE_LOAD_TIMEOUT = 10000;
    this.activePicture = activeNumber;

    this.elemTemplate = document.querySelector('#picture-template');

    if ('content' in this.elemTemplate) {
      this.elemToClone = this.elemTemplate.content.querySelector('.picture');
    } else {
      this.elemToClone = this.elemTemplate.querySelector('.picture');
    }

    this.element = this.elemToClone.cloneNode(true);

    BaseComponent.call(this, this.element);

    this.imgElem = this.element.querySelector('img');
    this.tileImage = new Image();

    this.likeElem = this.element.querySelector('.picture-likes');
    this.commentElem = this.element.querySelector('.picture-comments');

    this.onImageLoad = this.onImageLoad.bind(this);
    this.tileImage.addEventListener('load', this.onImageLoad);

    this.onImageError = this.onImageError.bind(this);
    this.tileImage.addEventListener('error', this.onImageError);

    this.onPictureMouseOver = this.onPictureMouseOver.bind(this);
    this.element.addEventListener('mouseover', this.onPictureMouseOver);

    this.onPictureClick = this.onPictureClick.bind(this);

    this.tileImage.src = this.data.getUrl();

    this.byTimeout = this.byTimeout.bind(this);
    this.tileTimeout = setTimeout(this.byTimeout, IMAGE_LOAD_TIMEOUT);
  };

  utils(Picture, BaseComponent);

  Picture.prototype.onPictureMouseOver = function() {
    this.element.addEventListener('click', this.onPictureClick);
    if(!(this.likeElem.textContent || this.commentElem.textContent)) {
      this.likeElem.textContent = this.data.getLikesCount();
      this.commentElem.textContent = this.data.getCommentsCount();
    }
  };

  Picture.prototype.updateLikeCount = function() {
    this.likeElem.textContent = this.data.getLikesCount();
  };

  Picture.prototype.byTimeout = function() {
    this.tileImage.src = '';
    this.element.classList.add('picture-load-failure');
  };

  Picture.prototype.onPictureClick = function(evt) {
    if(evt.target.classList.contains('picture-likes')) {
      this.data.setLikes();
      this.updateLikeCount();
    } else if(evt.target.classList.contains('picture-comments')) {
      this.data.setCommentsCount(this.commentElem.textContent);
    } else {
      Gallery.show();
      Gallery.setActivePicture(this.activePicture);
    }
    evt.preventDefault();
  };

  Picture.prototype.onImageLoad = function() {
    clearTimeout(this.tileTimeout);
    this.element.replaceChild(this.tileImage, this.imgElem);
    this.tileImage.width = 182;
    this.tileImage.height = 182;
    this.remove();
  };

  Picture.prototype.onImageError = function() {
    clearTimeout(this.tileTimeout);
    this.element.classList.add('picture-load-failure');
    this.remove();
  };

  Picture.prototype.remove = function() {
    this.element.removeEventListener('load', this.onPictureClick);
    this.element.removeEventListener('error', this.onPictureClick);
  };

  return Picture;
});
