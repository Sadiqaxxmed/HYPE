const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/jwt');
const { sendVerificationCode, verifyCode } = require('../utils/twilio');

// Standard login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(info);

    const token = generateToken(user);
    res.json({ token });
  })(req, res, next);
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Phone verification route
router.post('/phone/verify', async (req, res) => {
  const { phoneNumber } = req.body;
  await sendVerificationCode(phoneNumber);
  res.status(200).send('Verification code sent');
});

router.post('/phone/confirm', async (req, res) => {
  const { phoneNumber, code } = req.body;
  const verification = await verifyCode(phoneNumber, code);

  if (verification.status === 'approved') {
    let user = await User.findOne({ phoneNumber });
    if (!user) {
      user = new User({ phoneNumber, phoneVerified: true });
      await user.save();
    } else {
      user.phoneVerified = true;
      await user.save();
    }

    const token = generateToken(user);
    res.json({ token });
  } else {
    res.status(400).send('Invalid code');
  }
});

module.exports = router;