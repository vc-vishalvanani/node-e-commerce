const router = require('express').Router();
const controller = require('../controllers/user.controller');
const { verifyUser } = require('../middleware/jwt.auth');

router.get('/', verifyUser, controller.getUsers);

module.exports = router;