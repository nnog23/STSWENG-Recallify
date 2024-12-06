const { Router } = require("express");
const Deck = require("../models/Deck.js");
const Card = require("../models/Card.js");
const mongoose = require("mongoose");
const decksRouter = Router();

decksRouter.post("/users/:userId/decks/adddeck", async (req, res) => {
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
		res
			.status(201)
			.json({ message: "Deck added successfully.", deck: savedDeck });
	} catch (err) {
		console.error("Error adding deck:", err);
		res
			.status(400)
			.json({ error: "Failed to add deck.", details: err.message });
	}
});

decksRouter.delete("/users/:userId/decks/:deckId/delete", async (req, res) => {
	const { deckId } = req.params;
	console.log(deckId);

	try {
		const deletedDeck = await Deck.findOneAndDelete({ _id: deckId });
		if (!deletedDeck) {
			return res.status(404).json({ error: "Deck not found." });
		}
		res
			.status(200)
			.json({ message: "Deck removed successfully.", deck: deletedDeck });
	} catch (err) {
		console.error("Error removing deck:", err);
		res
			.status(500)
			.json({ error: "Failed to remove deck.", details: err.message });
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

decksRouter.put("/users/:userId/decks/:deckId/editdeck", async (req, res) => {
	const { deckId } = req.params;
	const updateData = req.body;
	try {
		const updatedDeck = await Deck.findOneAndUpdate(
			{ _id: deckId },
			updateData,
			{ new: true }
		);
		if (!updatedDeck) {
			return res.status(404).json({ error: "Deck not found." });
		}
		res
			.status(200)
			.json({ message: "Deck updated successfully.", deck: updatedDeck });
	} catch (err) {
		console.error("Error updating deck:", err);
		res
			.status(400)
			.json({ error: "Failed to update deck.", details: err.message });
	}
});

decksRouter.get("/users/:userId/decks/decklist", async (req, res) => {
	const { userId } = req.params; // Ensure userId is used correctly

	try {
		// Check if the userId is valid before querying
		if (!userId) {
			return res.status(400).json({ error: "User ID is required." });
		}

		const userDecks = await Deck.find({ userId: userId }); // Query decks based on userId
		res.status(200).json({
			message: "User decks retrieved successfully.",
			decks: userDecks,
		});
	} catch (err) {
		console.error("Error retrieving decks:", err);
		res
			.status(500)
			.json({ error: "Failed to fetch decks.", details: err.message });
	}
});

decksRouter.get("/users/:userId/decks/:deckId", async (req, res) => {
	console.log(req.params);
	const { userId, deckId } = req.params;

	try {
		console.log(`Fetching deck for userId: ${userId}, deckId: ${deckId}`);

		const deck = await Deck.findOne({ userId, _id: deckId });

		if (!deck) {
			return res.status(404).json({ message: "Deck not found." });
		}

		console.log(deck);
		res.status(200).json({ message: "Deck retrieved successfully.", deck });
	} catch (err) {
		console.error("Error retrieving deck:", err);
		res
			.status(500)
			.json({ error: "Failed to fetch the deck.", details: err.message });
	}
});

// Route to fetch all public decks
decksRouter.get("/browse", async (req, res) => {
	try {
		const publicDecks = await Deck.find({ private: false }); // Filter decks with private set to false
		res.json(publicDecks);
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch decks." });
	}
});

decksRouter.get("/decks/:deckId", async (req, res) => {
	console.log(req.params);
	const { deckId } = req.params;

	try {
		console.log(`Fetching deck for deckId: ${deckId}`);

		const deck = await Deck.findOne({ _id: deckId });

		if (!deck) {
			return res.status(404).json({ message: "Deck not found." });
		}

		console.log(deck);
		res.status(200).json({ message: "Deck retrieved successfully.", deck });
	} catch (err) {
		console.error("Error retrieving deck:", err);
		res
			.status(500)
			.json({ error: "Failed to fetch the deck.", details: err.message });
	}
});


decksRouter.post("/users/:userId/decks/:deckId/duplicate", async (req, res) => {
	const { deckId } = req.params;
	const { userId } = req.params; // Assuming the userId is provided in the request body

	try {
		// Find the original deck by ID
		const originalDeck = await Deck.findById(deckId);
		if (!originalDeck) {
			return res.status(404).json({ message: "Deck not found" });
		}

		// Clone the deck by creating a new object and setting a new ID and owner
		const duplicatedDeck = new Deck({

			_id: new mongoose.Types.ObjectId(), // Generate a new ID
			userId: userId, // Set the new owner (current user)
			title: originalDeck.title,
			description: originalDeck.description,
			private: originalDeck.private

		});
		
		// Save the duplicated deck
		await duplicatedDeck.save();

		// Optionally, duplicate all the cards associated with this deck
		const cards = await Card.find({ deckId });
		
		if (cards.length > 0) {
			const duplicatedCards = cards.map((card) => {
				return new Card({
					front: card.front,
					back: card.back,
					_id: new mongoose.Types.ObjectId(),
					deckId: duplicatedDeck._id, // Set the new deck ID
				});
			});
			console.log(duplicatedCards);
			await Card.insertMany(duplicatedCards);
		}

		return res
			.status(200)
			.json({ message: "Deck duplicated successfully", deck: duplicatedDeck });
	} catch (error) {
		console.error("Error duplicating deck:", error);
		return res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
});

// Route to duplicate a deck


// decksRouter.post("/users/:userId/decks/:deckId/duplicate", async (req, res) => {
// 	try {
// 		const { userId, deckId } = req.params;
// 		console.log("HEYSUP");
// 		console.log(deckId);
// 		// Fetch the original deck and its associated cards
// 		const originalDeck = await Deck.findOne({ _id: deckId }).populate("cards");
// 		if (!originalDeck) {
// 			return res.status(404).json({ error: "Deck not found" });
// 		}

// 		// Create a new deck by copying the original deck's data
// 		const newDeck = new Deck({
// 			title: originalDeck.title,
// 			description: originalDeck.description,
// 			private: originalDeck.private,
// 			userId: userId, // New deck will be associated with the same user
// 		});

// 		console.log(newDeck);
// 		// Save the new deck
// 		await newDeck.save();

// 		// Optionally, duplicate all the cards associated with this deck
// 		const cards = await Card.find({ deckId });
// 		if (cards.length > 0) {
// 			const duplicatedCards = cards.map((card) => {
// 				return new Card({
// 					...card.toObject(),
// 					deckId: duplicatedDeck._id, // Set the new deck ID
// 				});
// 			});
// 			await Card.insertMany(duplicatedCards);
// 		}

// 		// Wait for all cards to be saved
// 		await Promise.all(cardPromises);

// 		// Return the new deck's ID
// 		res.json({ newDeckId: newDeck._id });
// 	} catch (err) {
// 		res
// 			.status(500)
// 			.json({ error: "Failed to duplicate deck", details: err.message });
// 	}
// });

module.exports = decksRouter;
