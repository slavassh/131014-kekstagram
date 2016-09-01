/**
 * Created by Viacheslav Shestakov on 24.08.2016.
 */
'use strict';

define(['./gallery'], function(Gallery) {
  var Picture = function(data, activeNumber) {
    this.data = data;
    var self = this;
    var IMAGE_LOAD_TIMEOUT = 10000;
    this.elemTemplate = document.querySelector('#picture-template');

    if ('content' in this.elemTemplate) {
      this.elemToClone = this.elemTemplate.content.querySelector('.picture');
    } else {
      this.elemToClone = this.elemTemplate.querySelector('.picture');
    }

    this.element = this.elemToClone.cloneNode(true);

    this.imgElem = this.element.querySelector('img');
    this.tileImage = new Image();

    this.tileImage.onload = function() {
      self.onImageLoad();
    };

    this.tileImage.onerror = function() {
      self.onImageError();
    };

    this.tileImage.onclick = function() {
      self.onImageClick(activeNumber);
      return false;
    };

    this.tileImage.src = data.url;

    this.tileTimeout = setTimeout(function() {
      self.tileImage.src = '';
      self.element.classList.add('picture-load-failure');
    }, IMAGE_LOAD_TIMEOUT);
  };

  Picture.prototype.onImageClick = function(activePicture) {
    Gallery.show(activePicture);
    Gallery.setActivePicture(activePicture);
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
    this.tileImage.onload = null;
    this.tileImage.onerror = null;
  };

  return Picture;
});
