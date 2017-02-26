'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const bookmarkStore = {

  store: new JsonStore('./models/bookmark-store.json', { bookmarkCollection: [] }),
  collection: 'bookmarkCollection',

  getAllBookmarks() {
    return this.store.findAll(this.collection);
  },

  getBookmark(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addBookmark(bookmark) {
    this.store.add(this.collection, bookmark);
  },

  removeBookmark(id) {
    const bookmark = this.getBookmark(id);
    this.store.remove(this.collection, bookmark);
  },

  removeAllBookmarks() {
    this.store.removeAll(this.collection);
  },

  addLink(id, link) {
    const bookmark = this.getBookmark(id);
    bookmark.links.push(link);
  },

  removeLink(id, linkId) {
    const bookmark = this.getBookmark(id);
    const links = bookmark.links;
    _.remove(links, { id: linkId});
  }
};

module.exports = bookmarkStore;
