const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  outfit_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Outfit', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  review: String,
  rating: Number, 
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);