const express = require('express');
const router = express.Router();
const Review = require('./models/Review');
const authenticateJWT = require('../middleware/auth');

// Get all reviews
router.get('/', authenticateJWT, async (req, res) => {
    const reviews = await Review.find();
    res.send(reviews);
});

// Get a single review by ID
router.get('/:id', authenticateJWT, async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) {
        return res.status(404).send();
    }
    res.send(review);
});
// Create a new review
router.post('/', authenticateJWT, async (req, res) => {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).send(newReview);
});

// Update a review by ID
router.patch('/:id', authenticateJWT, async (req, res) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!review) {
        return res.status(404).send();
    }
    res.send(review);
});

// Delete a review by ID
router.delete('/:id', authenticateJWT, async (req, res) => {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
        return res.status(404).send();
    }
    res.send(review);
});

module.exports = router;
