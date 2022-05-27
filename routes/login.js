const express = require('express');
const LoginController = require('../controllers/LoginController');
const router = express.Router();

router.get('/', LoginController.loadView);
router.post('/', LoginController.LoginUser);

module.exports = router;
