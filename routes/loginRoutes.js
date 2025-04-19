var express = require('express');

var userController = require('../controllers/userController');
const router = express.Router();

router.route('/user/login').post(userController.loginUserController);
router.route('/user/create').post(userController.createUserController);


module.exports = router;