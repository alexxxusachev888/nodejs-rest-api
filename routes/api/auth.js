const express = require('express');
const router = express.Router();

const { schemas: { registerSchema, loginSchema, updateSubscriptionSchema } } = require('../../models/user');
const { validateBody, authenticate } = require('../../middlewares');
const { register, login, getCurrent, logout, updateSubscription } = require('../../controllers/auth');

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/logout', authenticate, logout);
router.get('/current', authenticate, getCurrent);
router.patch('/', authenticate, validateBody(updateSubscriptionSchema), updateSubscription);

module.exports = router;