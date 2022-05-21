const express = require('express');
const SignUpController = require('../controllers/SignUpController');
const router = express.Router();

router.post('/', SignUpController.createUser);
router.get('/', SignUpController.loadView);

module.exports = router;