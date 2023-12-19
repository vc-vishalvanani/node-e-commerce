const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { validate } = require('../middleware/signup.middleware');

router.post('/login', authController.login);
router.post('/signup', validate, authController.signup);
router.get('/test', authController.hello);
router.get('/sendMail', authController.sendMail);
router.get('/confirmation/:id', authController.confirmation);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword/:id', authController.resetPassword);

module.exports = router;
