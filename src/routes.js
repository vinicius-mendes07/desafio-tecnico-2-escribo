const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const authService = require('./app/services/authService');

const router = Router();

router.post('/users/signup', UserController.store);
router.post('/users/signin', UserController.auth);
router.get('/users/:id', authService, UserController.show);

module.exports = router;
