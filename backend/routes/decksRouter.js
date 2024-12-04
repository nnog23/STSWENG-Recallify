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


decksRouter.delete('/users/:userId/decks/:deckId/delete', async (req, res) => {

    const { deckId } = req.params;
    console.log(deckId);

    try {
        const deletedDeck = await Deck.findOneAndDelete({ _id: deckId });
        if (!deletedDeck) {
            return res.status(404).json({ error: 'Deck not found.' });
        }
        res.status(200).json({ message: 'Deck removed successfully.', deck: deletedDeck });
    } catch (err) {
        console.error('Error removing deck:', err);
        res.status(500).json({ error: 'Failed to remove deck.', details: err.message });
    }
});



/*
decksRouter.get('/users/:userId/decks/:deckId', async (req, res) => {
    const { deckId } = req.params;
    try {
        // Corrected line, no need to wrap deckId in an object
        const deck = await Deck.findById(deckId);
        
        if (!deck) {
            return res.status(404).json({ error: 'Deck not found.' });
        }
        res.status(200).json({ deck });
    } catch (err) {
        console.error('Error fetching deck:', err);
        res.status(500).json({ error: 'Failed to fetch deck details.', details: err.message });
    }
});

*/

decksRouter.put('/users/:userId/decks/:deckId/editdeck', async (req, res) => {
    const { deckId } = req.params;
    const updateData = req.body;
    try {
        const updatedDeck = await Deck.findOneAndUpdate(
            { _id: deckId },
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


decksRouter.get('/users/:userId/decks/decklist', async (req, res) => {

    const { userId } = req.params; // Ensure userId is used correctly
    
    try {
        // Check if the userId is valid before querying
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required.' });
        }

        const userDecks = await Deck.find({ userId: userId }); // Query decks based on userId
        res.status(200).json({ message: 'User decks retrieved successfully.', decks: userDecks });
    } catch (err) {
        console.error('Error retrieving decks:', err);
        res.status(500).json({ error: 'Failed to fetch decks.', details: err.message });
    }
});


decksRouter.get('/users/:userId/decks/:deckId', async (req, res) => {
    
    console.log(req.params);
    const { userId, deckId } = req.params;

    try {
        console.log(`Fetching deck for userId: ${userId}, deckId: ${deckId}`);

        const deck = await Deck.findOne({ userId, _id: deckId });

        if (!deck) {
            return res.status(404).json({ message: 'Deck not found.' });
        }

        console.log(deck);
        res.status(200).json({ message: 'Deck retrieved successfully.', deck });
    } catch (err) {
        console.error('Error retrieving deck:', err);
        res.status(500).json({ error: 'Failed to fetch the deck.', details: err.message });
    }
});




module.exports = decksRouter;