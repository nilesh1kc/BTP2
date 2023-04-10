const express = require('express');
const router = express.Router();
const authController = require('./../controller/authController')


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);

module.exports = router