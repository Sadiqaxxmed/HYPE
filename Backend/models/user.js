const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String }, 
  googleId: { type: String }, 
  phoneNumber: { type: String }, 
  phoneVerified: { type: Boolean, default: false }, 
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
