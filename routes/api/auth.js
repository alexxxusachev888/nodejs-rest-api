const express = require('express');
const router = express.Router();

const { schemas: { registerSchema, loginSchema, updateSubscriptionSchema } } = require('../../models/user');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { register, login, getCurrent, logout, updateSubscription, updateAvatar } = require('../../controllers/auth');

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/logout', authenticate, logout);
router.get('/current', authenticate, getCurrent);
router.patch('/', authenticate, validateBody(updateSubscriptionSchema), updateSubscription);
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

module.exports = router;