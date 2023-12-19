const router = require('express').Router();
const placeOrder = require('../controllers/place-order.controller');

router.post('', placeOrder.placeOrder)

module.exports = router;
