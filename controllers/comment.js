'use strict';

const logger = require('../utils/logger');
const commentStore = require('../models/comment-store');
const uuid = require('uuid');

const comment = {
  index(request, response) {
    const commentId = request.params.id;
    logger.debug('Comment id = ', commentId);
    const viewData = {
      title: 'Comments',
      comments: commentStore.getComment(commentId),
    };
    response.render('comment', viewData);
  },

  deleteInfo(request, response) {
    const commentId = request.params.id;
    const infoId = request.params.linkid;
    logger.debug(`Deleting info ${infoId} from Comment ${commentId}`);
    commentStore.removeInfo(commentId, infoId);
    response.redirect('/comment/' + commentId);
  },

  addInfo(request, response) {
    const commentId = request.params.id;
    const comment = commentStore.getComment(commentId);
    const newInfo = {
      id: uuid(),
      fname: request.body.fname,
      sname: request.body.sname,
      comment: request.body.comment,
    };
    commentStore.addInfo(commentId, newInfo);
    response.redirect('/comment/' + commentId);
  },
};

module.exports = comment;