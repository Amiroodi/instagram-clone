const express = require('express');
const UploadPhotoController = require('../controllers/UploadPhotoController');
const router = express.Router();

router.get('/', UploadPhotoController.loadView);
router.post('/', UploadPhotoController.uploadPhoto);

module.exports = router;