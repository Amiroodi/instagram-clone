const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getUser', UserController.getUser);

module.exports = router;