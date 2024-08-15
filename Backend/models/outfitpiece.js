const mongoose = require('mongoose');

const outfitPieceSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  outfit_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Outfit', required: true },
  brand_name: String,
  piece_name: String,
  image: String,
  price: String,
  link: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('OutfitPiece', outfitPieceSchema);
