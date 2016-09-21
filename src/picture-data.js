/**
 * Created by Viacheslav Shestakov on 14.09.2016.
 */
'use strict';

define(function() {
  var PictureData = function(item) {
    this.likesCount = item.likes;
    this.likeState = false;
    this.commentsCount = item.comments;
    this.createdDate = item.created;
    this.fileUrl = item.url;
  };

  PictureData.prototype.getLikesCount = function() {
    return this.likesCount;
  };

  PictureData.prototype.getCommentsCount = function() {
    return this.commentsCount;
  };

  PictureData.prototype.getLikeState = function() {
    return this.likeState;
  };

  PictureData.prototype.getUrl = function() {
    return this.fileUrl;
  };

  PictureData.prototype.setLikes = function() {
    if(!this.likeState) {
      this.likesCount++;
    } else {
      this.likesCount--;
    }
    this.likeState = !this.likeState;
  };

  PictureData.prototype.setCommentsCount = function(changedCommentsCount) {
    this.commentsCount = changedCommentsCount;
  };

  PictureData.prototype.setCreatedDate = function(changedCreatedDate) {
    this.createdDate = changedCreatedDate;
  };

  PictureData.prototype.setUrl = function(changedFileUrl) {
    this.fileUrl = changedFileUrl;
  };

  return PictureData;
});
