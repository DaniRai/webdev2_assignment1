'use strict';

const logger = require('../utils/logger');
const bookmarkStore = require('../models/bookmark-store');
const uuid = require('uuid');

const bookmark = {
  index(request, response) {
    const bookmarkId = request.params.id;
    logger.debug('Bookmark id = ', bookmarkId);
    const viewData = {
      title: 'Bookmarks',
      bookmark: bookmarkStore.getBookmark(bookmarkId),
    };
    response.render('bookmark', viewData);
  },

  deleteLink(request, response) {
    const bookmarkId = request.params.id;
    const linkId = request.params.linkid;
    logger.debug(`Deleting Link ${linkId} from Bookmark ${bookmarkId}`);
    bookmarkStore.removeLink(bookmarkId, linkId);
    response.redirect('/bookmark/' + bookmarkId);
  },

  addLink(request, response) {
    const bookmarkId = request.params.id;
    const bookmark = bookmarkStore.getBookmark(bookmarkId);
    const newLink = {
      id: uuid(),
      address: request.body.address,
      website: request.body.website,
      summary: request.body.summary,
    };
    bookmarkStore.addLink(bookmarkId, newLink);
    response.redirect('/bookmark/' + bookmarkId);
  },
};

module.exports = bookmark;
