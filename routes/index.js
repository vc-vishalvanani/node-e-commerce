const express = require('express');
const router = express.Router();

const post = require('./post.router');
const auth = require('./auth.router');
const product = require('./product.router');
const cart = require('./cart.router');
const order = require('./order.router');

const authMiddleware = require("../middleware/auth.middleware");

router.use('/api/auth', auth);
router.use('/api/product', product);
router.use('/api/posts', authMiddleware.authVerify, post);
router.use('/api/cart', authMiddleware.authVerify, cart);
router.use('/api/place-order', authMiddleware.authVerify, order);

module.exports = router;
