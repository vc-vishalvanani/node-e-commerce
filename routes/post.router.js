const router = require('express').Router();
const post = require('../controllers/post.controller');
const { validate } = require('../middleware/post.middleware');

router.post('/', validate, post.add);
router.get('/', post.get);
router.get('/:id', post.getById);
router.delete('/:id', post.delete);
router.patch('/:id', validate, post.update);

module.exports = router;
