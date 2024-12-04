const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/jwt');
const { sendVerificationCode, verifyCode } = require('../utils/twilio');

// User Signup route
router.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    // Generate a token (optional)
    const token = generateToken(newUser);

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Standard login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return token and user details
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        profile_pic: user.profile_pic, // Optional, depending on your user model
        bio: user.bio, // Optional, depending on your user model
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});


// Google OAuth login route
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Phone verification route
// router.post('/phone/verify', async (req, res) => {
//   const { phoneNumber } = req.body;
//   await sendVerificationCode(phoneNumber);
//   res.status(200).send('Verification code sent');
// });

// router.post('/phone/confirm', async (req, res) => {
//   const { phoneNumber, code } = req.body;
//   const verification = await verifyCode(phoneNumber, code);

//   if (verification.status === 'approved') {
//     let user = await User.findOne({ phoneNumber });
//     if (!user) {
//       user = new User({ phoneNumber, phoneVerified: true });
//       await user.save();
//     } else {
//       user.phoneVerified = true;
//       await user.save();
//     }

//     const token = generateToken(user);
//     res.json({ token });
//   } else {
//     res.status(400).send('Invalid code');
//   }
// });

module.exports = router;