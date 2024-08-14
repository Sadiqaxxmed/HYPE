const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  profile_pic: String,
  bio: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  password_reset_token: String,
  password_reset_expires: Date,
  last_login: Date,
});

module.exports = mongoose.model('User', userSchema);
