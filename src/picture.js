/**
 * Created by Viacheslav Shestakov on 24.08.2016.
 */
'use strict';

define(['./gallery', './utils', './base-component'], function(Gallery, utils, BaseComponent) {
  var Picture = function(data, container, activeNumber) {

    this.data = data;
    console.log('Data: ');
    console.dir(data);

    var IMAGE_LOAD_TIMEOUT = 10000;
    this.activePicture = activeNumber;

    this.elemTemplate = document.querySelector('#picture-template');

    if ('content' in this.elemTemplate) {
      this.elemToClone = this.elemTemplate.content.querySelector('.picture');
    } else {
      this.elemToClone = this.elemTemplate.querySelector('.picture');
    }

    var element = this.elemToClone.cloneNode(true);

    this.element = element;
    BaseComponent.call(this, element, container);

    console.log('this.element: ');
    console.dir(this.element);



    this.imgElem = this.element.querySelector('img');
    this.tileImage = new Image();

    this.onImageLoad = this.onImageLoad.bind(this);
    this.tileImage.addEventListener('load', this.onImageLoad);

    this.onImageError = this.onImageError.bind(this);
    this.tileImage.addEventListener('error', this.onImageError);

    this.onImageClick = this.onImageClick.bind(this);
    this.tileImage.addEventListener('click', this.onImageClick);

    this.tileImage.src = data.url;

    this.byTimeout = this.byTimeout.bind(this);
    this.tileTimeout = setTimeout(this.byTimeout, IMAGE_LOAD_TIMEOUT);
  };

  utils(Picture, BaseComponent);

  Picture.prototype.byTimeout = function() {
    this.tileImage.src = '';
    this.element.classList.add('picture-load-failure');
  };

  Picture.prototype.onImageClick = function() {
    Gallery.show();
    Gallery.setActivePicture(this.activePicture);
    event.preventDefault();
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
    this.tileImage.removeEventListener('load', this.onImageClick);
    this.tileImage.removeEventListener('error', this.onImageClick);
  };

  return Picture;
});
