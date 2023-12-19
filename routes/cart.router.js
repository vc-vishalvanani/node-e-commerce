const router = require('express').Router();
const cart = require('../controllers/cart.controller');
const { verifyUser } = require('../middleware/jwt.auth');

router.post('/', verifyUser, cart.add);
router.get('/',verifyUser,  cart.get);
router.delete('/:id',verifyUser, cart.delete);

module.exports = router;
