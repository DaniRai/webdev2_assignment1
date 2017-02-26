'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const bookmarkStore = require('../models/bookmark-store');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      title: 'Bookmarks Dashboard',
      bookmarks: bookmarkStore.getAllBookmarks(),
    };
    logger.info('about to render', bookmarkStore.getAllBookmarks());
    response.render('dashboard', viewData);
  },

  deleteBookmark(request, response) {
    const bookmarkId = request.params.id;
    logger.debug(`Deleting Bookmark ${bookmarkId}`);
    bookmarkStore.removeBookmark(bookmarkId);
    response.redirect('/dashboard');
  },

  addBookmark(request, response) {
    const newBookmark = {
      id: uuid(),
      catagory: request.body.catagory,
      links: [],
    };
    logger.debug('Creating a new Bookmark', newBookmark);
    bookmarkStore.addBookmark(newBookmark);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
