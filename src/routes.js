const { Router } = require('express');
const UserController = require('./app/controllers/UserController');

const router = Router();

router.get('/users', UserController.index);
router.post('/users/signup', UserController.store);
router.post('/users/signin', UserController.auth);

module.exports = router;
