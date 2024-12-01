const { Router } = require('express');
const Deck = require('../models/Deck.js');

const decksRouter = Router();


decksRouter.post('/users/:userId/decks/adddeck', async (req, res) => {
    console.log("Received request to add a new deck");

    const { title, description, private, userId } = req.body;  
    

    console.log(userId);

    try {
     
        const newDeck = new Deck({
            userId,
            title,
            description,
            private,
        });

        // Save the new deck to the database
        const savedDeck = await newDeck.save();

        // Send a success response with the saved deck data
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

decksRouter.get('/users/:userId/decks/decklist', async (req, res) => {

    console.log(req.params);
    const { userId } = req.params;

    try {
        console.log(userId);

        const userDecks = await Deck.find({ userId });
        console.log(userDecks);
        res.status(200).json({ message: 'User decks retrieved successfully.', decks: userDecks });
    } catch (err) {
        console.error('Error retrieving decks:', err);
        res.status(500).json({ error: 'Failed to fetch decks.', details: err.message });
    }
});


module.exports = decksRouter;