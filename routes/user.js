const express = require('express');
const UserHomeController = require('../controllers/UserHomeController');
const UploadPhotoController = require('../controllers/UploadPhotoController');
const router = express.Router();

router.get('/home', UserHomeController.loadView);
router.get('/upload_photo', UploadPhotoController.loadView);
router.post('/upload_photo', UploadPhotoController.uploadPhoto);

module.exports = router;
