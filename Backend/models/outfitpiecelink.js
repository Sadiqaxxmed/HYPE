const mongoose = require('mongoose');

const outfitPieceLinkSchema = new mongoose.Schema({
  outfit_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Outfit', required: true },
  piece_id: { type: mongoose.Schema.Types.ObjectId, ref: 'OutfitPiece', required: true },
});

module.exports = mongoose.model('OutfitPieceLink', outfitPieceLinkSchema);
