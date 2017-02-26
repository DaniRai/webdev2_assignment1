'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const commentStore = {

  store: new JsonStore('./models/comment-store.json', { commentCollection: [] }),
  collection: 'commentCollection',

  getAllComments() {
    return this.store.findAll(this.collection);
  },

  getComment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addComment(comment) {
    this.store.add(this.collection, comment);
  },

  removeComment(id) {
    const comment = this.getComment(id);
    this.store.remove(this.collection, comment);
  },

  removeAllComments() {
    this.store.removeAll(this.collection);
  },

  addInfo(id, info) {
    const comment = this.getComment(id);
    comment.info.push(info);
  },

  removeInfo(id, infoId) {
    const comment = this.getBookmark(id);
    const info = comment.info;
    _.remove(info, { id: infoId});
  }
};

module.exports = commentStore;
