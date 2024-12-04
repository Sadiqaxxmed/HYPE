const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Local strategy for standard login
passport.use(new LocalStrategy({
  usernameField: 'email', // Can be 'username' if you prefer to use username instead of email
  passwordField: 'password'
}, async (email, password, done) => {
  console.log('Attempting login with:', email);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('No user found with email:', email); // Add this for debugging
      return done(null, false, { message: 'Incorrect email.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('User from DB:', user);
    console.log('Password match:', isMatch);
    console.log("PASSWORDS", password, user.password)
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

// // Google OAuth strategy
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   callbackURL: '/auth/google/callback'
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     let user = await User.findOne({ googleId: profile.id });

//     if (!user) {
//       user = new User({
//         username: profile.displayName,
//         email: profile.emails[0].value,
//         googleId: profile.id
//       });
//       await user.save();
//     }

//     done(null, user);
//   } catch (err) {
//     done(err, false);
//   }
// }));

