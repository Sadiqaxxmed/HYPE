const mongoose = require('mongoose');

// Define the schema
const outfitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const Outfit = mongoose.model('Outfit', outfitSchema);

module.exports = Outfit;
