const express = require('express');
const router = express.Router();
const Outfit = require('../models/outfit');
const OutfitPiece = require('../models/outfitPiece');
const authenticateJWT = require('../middleware/auth');

// Get all outfits
router.get('/', async (req, res) => {
  const outfits = await Outfit.find();
  res.send(outfits);
});

// Get a single outfit by ID
router.get('/:id', authenticateJWT, async (req, res) => {
  const outfit = await Outfit.findById(req.params.id);
  if (!outfit) {
    return res.status(404).send();
  }
  res.send(outfit);
});

// Create a new outfit and its pieces
router.post('/newOutfit', authenticateJWT, async (req, res) => {
  const { user_id, images, description, pieces } = req.body;

  // Create the outfit first
  const newOutfit = new Outfit({ user_id, images, description });
  await newOutfit.save();

  // Create each outfit piece and link it to the outfit
  const outfitPieceIds = [];
  for (const piece of pieces) {
    const newPiece = new OutfitPiece({
      user_id,
      outfit_id: newOutfit._id, // Link the piece to the outfit
      ...piece,
    });
    await newPiece.save();
    outfitPieceIds.push(newPiece._id);
  }

  // Update the outfit with the pieces
  newOutfit.pieces = outfitPieceIds;
  await newOutfit.save();

  res.status(201).send(newOutfit);
});

// Update an outfit by ID
router.patch('/updateOutfit/:id', authenticateJWT, async (req, res) => {
  const outfit = await Outfit.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!outfit) {
    return res.status(404).send();
  }
  res.send(outfit);
});

// Delete an outfit by ID
router.delete('/deleteOutfit/:id', authenticateJWT, async (req, res) => {
  const outfit = await Outfit.findByIdAndDelete(req.params.id);
  if (!outfit) {
    return res.status(404).send();
  }
  res.send(outfit);
});

module.exports = router;
