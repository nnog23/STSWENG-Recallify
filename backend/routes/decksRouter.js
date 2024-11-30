const { Router } = require('express');
const Deck = require('../models/Deck.js');

const decksRouter = Router();


decksRouter.post('/decks', async (req, res) => {
    console.log("Received request to add a new deck");

   // const { deckId, userId, title, description, private } = req.body; (if users are implemented this would work)

   const {title, description, private } = req.body;

   deckId = 1000000000;
   userId = 1000000000;

    try {
        const newDeck = new Deck({
            deckId,
            userId,
            title,
            description,
            private,
        });

        const savedDeck = await newDeck.save();
        res.status(201).json({ message: 'Deck added successfully.', deck: savedDeck });
    } catch (err) {
        console.error('Error adding deck:', err);
        res.status(400).json({ error: 'Failed to add deck.', details: err.message });
    }
});


decksRouter.delete('/decks/:deckId', async (req, res) => {
    const { deckId } = req.params;

    try {
        const deletedDeck = await Deck.findOneAndDelete({ deckId });
        if (!deletedDeck) {
            return res.status(404).json({ error: 'Deck not found.' });
        }
        res.status(200).json({ message: 'Deck removed successfully.', deck: deletedDeck });
    } catch (err) {
        console.error('Error removing deck:', err);
        res.status(500).json({ error: 'Failed to remove deck.', details: err.message });
    }
});

decksRouter.put('/decks/:deckId', async (req, res) => {
    const { deckId } = req.params;
    const updateData = req.body;

    try {
        const updatedDeck = await Deck.findOneAndUpdate(
            { deckId },
            updateData,
            { new: true }
        );
        if (!updatedDeck) {
            return res.status(404).json({ error: 'Deck not found.' });
        }
        res.status(200).json({ message: 'Deck updated successfully.', deck: updatedDeck });
    } catch (err) {
        console.error('Error updating deck:', err);
        res.status(400).json({ error: 'Failed to update deck.', details: err.message });
    }
});

// retrieve all decks

decksRouter.get('/user/:userId/decks', async (req, res) => {
    const { userId } = req.params;

    try {
        const userDecks = await Deck.find({ userId });
        res.status(200).json({ message: 'User decks retrieved successfully.', decks: userDecks });
    } catch (err) {
        console.error('Error retrieving decks:', err);
        res.status(500).json({ error: 'Failed to fetch decks.', details: err.message });
    }
});


module.exports = decksRouter;