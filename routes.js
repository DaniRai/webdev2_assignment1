'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start');
const dashboard = require('./controllers/dashboard.js');
const bookmark = require('./controllers/bookmark.js');
const about = require('./controllers/about.js');
const comment = require('./controllers/comment.js');

router.get('/', start.index);

router.get('/dashboard', dashboard.index);
router.get('/dashboard/deletebookmark/:id', dashboard.deleteBookmark);
router.post('/dashboard/addbookmark', dashboard.addBookmark);

router.get('/bookmark/:id', bookmark.index);
router.get('/bookmark/:id/deletelink/:linkid', bookmark.deleteLink);
router.post('/bookmark/:id/addlink', bookmark.addLink);

router.get('/about', about.index);

router.get('/comment/:id', comment.index);
router.get('/comment/:id/deleteinfo/:infoid', comment.deleteInfo);
router.post('/comment/addinfo', comment.addInfo);

module.exports = router;
