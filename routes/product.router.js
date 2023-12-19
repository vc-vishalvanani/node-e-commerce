const router = require('express').Router();
const product = require('../controllers/product.controller');
const { validate } = require('../middleware/product.middleware');
const { verifyUser } = require('../middleware/jwt.auth');

router.post('/', verifyUser, product.add);
router.get('/', verifyUser, product.get)
router.patch('/:id', verifyUser, product.update)
router.get('/:id',verifyUser, product.getById)
router.delete('/:id', verifyUser, product.delete)

module.exports = router;
