const express = require('express');
const Deck = require('../models/Deck'); // Adjust the path as necessary
const router = express.Router();

// Create a new deck
router.post('/', async (req, res) => {
    const { title, description, cards, owner, isPublic } = req.body;
    try {
        const newDeck = new Deck({ title, description, cards, owner, isPublic });
        await newDeck.save();
        res.status(201).json(newDeck);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all decks
router.get('/', async (req, res) => {
    try {
        const decks = await Deck.find().populate('owner'); // Populate owner details if needed
        res.json(decks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific deck by ID
router.get('/:id', async (req, res) => {
    try {
        const deck = await Deck.findById(req.params.id).populate('owner');
        if (!deck) return res.status(404).json({ message: 'Deck not found' });
        res.json(deck);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a deck
router.put('/:id', async (req, res) => {
    try {
        const updatedDeck = await Deck.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDeck) return res.status(404).json({ message: 'Deck not found' });
        res.json(updatedDeck);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a deck
router.delete('/:id', async (req, res) => {
    try {
        const deletedDeck = await Deck.findByIdAndDelete(req.params.id);
        if (!deletedDeck) return res.status(404).json({ message: 'Deck not found' });
        res.json({ message: 'Deck deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;