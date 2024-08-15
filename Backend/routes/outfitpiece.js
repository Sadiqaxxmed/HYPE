const express = require('express');
const router = express.Router();
const OutfitPiece = require('./models/OutfitPiece');

// Get all outfit pieces
router.get('/', async (req, res) => {
    const outfitPieces = await OutfitPiece.find();
    res.send(outfitPieces);
});

// Get a single outfit piece by ID
router.get('/:id', async (req, res) => {
    const outfitPiece = await OutfitPiece.findById(req.params.id);
    if (!outfitPiece) {
        return res.status(404).send();
    }
    res.send(outfitPiece);
});

// Create a new outfit piece
router.post('/newOutfitPiece', async (req, res) => {
    const newOutfitPiece = new OutfitPiece(req.body);
    await newOutfitPiece.save();
    res.status(201).send(newOutfitPiece);
});

// Update an outfit piece by ID
router.patch('/updateOutfitPiece/:id', async (req, res) => {
    const outfitPiece = await OutfitPiece.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!outfitPiece) {
    return res.status(404).send();
    }
    res.send(outfitPiece);
});

// Delete an outfit piece by ID
router.delete('deleteOutfitPiece/:id', async (req, res) => {
    const outfitPiece = await OutfitPiece.findByIdAndDelete(req.params.id);
    if (!outfitPiece) {
        return res.status(404).send();
    }
    res.send(outfitPiece);
});

module.exports = router;

