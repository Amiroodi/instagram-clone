const express = require('express');
const UserController = require('../controllers/UserController');
const UploadPhotoController = require('../controllers/UploadPhotoController');
const router = express.Router();

router.get('/home', UserController.loadView);
router.get('/upload_photo', UploadPhotoController.loadView);
router.post('/upload_photo', UploadPhotoController.uploadPhoto);

module.exports = router;
