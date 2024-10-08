const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  images: [String],
  description: String,
  created_at: { type: Date, default: Date.now },
  pieces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OutfitPiece' }] 
});

module.exports = mongoose.model('Outfit', outfitSchema);