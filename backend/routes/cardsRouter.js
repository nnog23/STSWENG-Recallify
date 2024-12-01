const { Router } = require("express");
const Card = require("../models/Card.js");

const cardsRouter = Router();

cardsRouter.post("/users/:userId/decks/:deckId/cards", async (req, res) => {
	console.log("Received request to add card");

	// const { cardId, deckId, front, back } = req.body;

	const { deckId } = req.params;

	const { front, back } = req.body;

	console.log(deckId);
	console.log(req.body);

	

	try {
		const newCard = new Card({deckId, front, back });
		const savedCard = await newCard.save();
		res
			.status(201)
			.json({ message: "Card added successfully.", card: savedCard });
	} catch (err) {
		console.log("Error adding card:", err);
		res
			.status(400)
			.json({ error: "Failed to add card.", details: err.message });
	}
});

cardsRouter.delete("/cards/:cardid", async (req, res) => {
	const { cardId } = req.params;

	try {
		const deletedCard = await Card.findOneAndDelete({ cardId });
		if (!deletedCard) {
			return res.status(404).json({ error: "Card not found." });
		}
		res
			.status(200)
			.json({ message: "Card removed successfully.", card: deletedCard });
	} catch (err) {
		res
			.status(500)
			.json({ error: "Failed to remove card.", details: err.message });
	}
});

cardsRouter.put("/users/:userId/decks/:deckId/cards/:cardId", async (req, res) => {
	const { cardId } = req.params;
	const updateData = req.body;
	
	try {
		// Use _id as the query key, assuming you're using MongoDB's default _id field
		const updatedCard = await Card.findOneAndUpdate({ _id: cardId }, updateData, {
			new: true,
		});
		if (!updatedCard) {
			return res.status(404).json({ error: "Card not found." });
		}
		res.status(200).json({ message: "Card updated successfully.", card: updatedCard });
	} catch (err) {
		res.status(400).json({ error: "Failed to update card.", details: err.message });
	}
});

cardsRouter.get("/users/:userId/decks/:deckId/cards/cardlist", async (req, res) => {
	try {
		const cards = await Card.find(); // Fetch all cards
		res.status(200).json({ cards });
	} catch (err) {
		console.log("Error fetching cards:", err);
		res
			.status(500)
			.json({ error: "Failed to fetch cards.", details: err.message });
	}
});

module.exports = cardsRouter;
