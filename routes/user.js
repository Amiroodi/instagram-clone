const express = require('express');
const router = express.Router();

const UserHomeController = require('../controllers/UserHomeController');
const UserSinglePhotoController = require('../controllers/UserSinglePhotoController');
const UserUploadPhotoController = require('../controllers/UserUploadPhotoController');
const UserLikeController = require('../controllers/UserLikeController');
const UserSearchController = require('../controllers/UserSearchController');

router.get('/home', UserHomeController.loadView);

router.get('/upload_photo', UserUploadPhotoController.loadView);
router.post('/upload_photo', UserUploadPhotoController.uploadPhoto);

router.get('/photo', UserSinglePhotoController.loadView);

router.post('/photo/like', UserLikeController.like);
router.post('/photo/dislike', UserLikeController.dislike);

router.get('/search', UserSearchController.loadView);
router.post('/search', UserSearchController.findAll);

router.get('/searched_tag', UserSearchController.bringeSingleTag);
router.get('/searched_user', UserSearchController.bringeSingleUser);

module.exports = router;
