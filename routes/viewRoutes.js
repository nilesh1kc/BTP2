const express = require('express');
const viewsController = require('../controller/viewsController');
const authController = require('../controller/authController');

const router = express.Router();

router.get('/login',viewsController.getLoginPage)
router.get('/navigator',authController.protect,viewsController.getNavigator)
router.get('/updateform',authController.protect,viewsController.getUpdateForm)
router.get('/map',authController.protect,viewsController.getMap)
module.exports = router;
