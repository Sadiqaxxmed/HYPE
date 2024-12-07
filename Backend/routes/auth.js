const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/jwt');
const { authenticateToken } = require('../middleware/auth'); // Middleware to verify token
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
        profile_pic: user.profile_pic, 
        bio: user.bio, 
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Route to get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Route to get current user
router.get('/current', async (req, res) => {
  try {
    const user = req.user;
    res.json({ user });
  } catch (err) {
    res.status(500).json({ errors: ['Failed to fetch current user'] });
  }
});

module.exports = router;