const express = require('express');
const UploadPhotoController = require('../controllers/UploadPhotoController');
const router = express.Router();

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

router.get('/', UploadPhotoController.loadView);

// upload.single() is a multer function used for parsing multi-part form data and attaching it to req object.
router.post('/', UploadPhotoController.uploadPhoto);

module.exports = router;