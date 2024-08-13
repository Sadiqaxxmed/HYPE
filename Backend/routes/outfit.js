const express = require('express');
const router = express.Router();
const Outfit = require('../models/outfit');

// Create a new outfit
router.post('/', async (req, res) => {
  try {
    const newOutfit = new Outfit(req.body);
    await newOutfit.save();
    res.status(201).send(newOutfit);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all outfits
router.get('/', async (req, res) => {
  try {
    const outfits = await Outfit.find();
    res.send(outfits);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single outfit by ID
router.get('/:id', async (req, res) => {
  try {
    const outfit = await Outfit.findById(req.params.id);
    if (!outfit) {
      return res.status(404).send();
    }
    res.send(outfit);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an outfit by ID
router.patch('/:id', async (req, res) => {
  try {
    const outfit = await Outfit.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!outfit) {
      return res.status(404).send();
    }
    res.send(outfit);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an outfit by ID
router.delete('/:id', async (req, res) => {
  try {
    const outfit = await Outfit.findByIdAndDelete(req.params.id);
    if (!outfit) {
      return res.status(404).send();
    }
    res.send(outfit);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
