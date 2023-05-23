const express = require('express');
const router = express.Router();

const { schemas: { registerSchema, loginSchema, updateSubscriptionSchema, emailSchema } } = require('../../models/user');
const { validateBody, authenticate, upload, validateEmail } = require('../../middlewares');
const { register, login, getCurrent, logout, updateSubscription, updateAvatar, verifyEmail, resendVerification } = require('../../controllers/auth');

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/logout', authenticate, logout);
router.get('/current', authenticate, getCurrent);
router.patch('/', authenticate, validateBody(updateSubscriptionSchema), updateSubscription);
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);
router.get('/verify/:verificationToken', verifyEmail);
router.post('/verify', validateEmail(emailSchema), resendVerification)

module.exports = router;