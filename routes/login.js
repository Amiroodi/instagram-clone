const express = require('express');
const LoginController = require('../controllers/LoginController');
const router = express.Router();

router.get('/login', LoginController.loadView);
router.post('/login', LoginController.LoginUser);

module.exports = router;
