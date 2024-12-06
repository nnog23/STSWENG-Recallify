const { Router } = require("express");
const Card = require("../models/Card.js");
const Deck = require("../models/Deck.js");
const updateCardReviewSM2 = require("../srs");

const cardsRouter = Router();

cardsRouter.post("/users/:userId/decks/:deckId/cards", async (req, res) => {
	console.log("Received request to add card");

	// const { cardId, deckId, front, back } = req.body;

	const { deckId } = req.params;

	const { front, back } = req.body;

	console.log(deckId);
	console.log(req.body);

	try {
		const newCard = new Card({ deckId, front, back });
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

cardsRouter.delete(
	"/users/:userId/decks/:deckId/cards/:cardId/delete",
	async (req, res) => {
		const { cardId } = req.params;

		try {
			const deletedCard = await Card.findOneAndDelete({ _id: cardId });
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
	}
);

cardsRouter.put(
	"/users/:userId/decks/:deckId/cards/:cardId",
	async (req, res) => {
		const { cardId } = req.params;
		const updateData = req.body;

		try {
			// Use _id as the query key, assuming you're using MongoDB's default _id field
			const updatedCard = await Card.findOneAndUpdate(
				{ _id: cardId },
				updateData,
				{
					new: true,
				}
			);
			if (!updatedCard) {
				return res.status(404).json({ error: "Card not found." });
			}
			res
				.status(200)
				.json({ message: "Card updated successfully.", card: updatedCard });
		} catch (err) {
			res
				.status(400)
				.json({ error: "Failed to update card.", details: err.message });
		}
	}
);

cardsRouter.get(
	"/users/:userId/decks/:deckId/cards/cardlist",
	async (req, res) => {
		const { deckId } = req.params;

		console.log(deckId);
		try {
			const cards = await Card.find({ deckId });
			if (!cards.length) {
				return res
					.status(404)
					.json({ message: "No cards found for this deck." });
			}
			res.status(200).json({ cards });
		} catch (err) {
			console.error("Error fetching cards:", err);
			res
				.status(500)
				.json({ error: "Failed to fetch cards.", details: err.message });
		}
	}
);

cardsRouter.get(
	"/users/:userId/decks/:deckId/cards/reviewcards",
	async (req, res) => {
		const { deckId } = req.params;

		console.log(deckId);
		try {
			const cards = await Card.find({ deckId });
			if (!cards.length) {
				return res
					.status(404)
					.json({ message: "No cards found for this deck." });
			}
			res.status(200).json({ cards });
		} catch (err) {
			console.error("Error fetching cards:", err);
			res
				.status(500)
				.json({ error: "Failed to fetch cards.", details: err.message });
		}
	}
);

cardsRouter.get("/users/:userId/decks/:deckId/cards/due", async (req, res) => {
	const { deckId } = req.params;

	const today = new Date();

	try {
		const cards = await Card.find({
			deckId: deckId,

			nextReviewDate: { $lte: today },
		});

		if (!cards.length) {
			return res
				.status(404)
				.json({ message: "No cards due today for this deck." });
		}

		console.log(cards);

		const numberofcards = cards.length;

		res.status(200).json({ numberofcards });
	} catch (err) {
		console.error("Error fetching cards:", err);
		res
			.status(500)
			.json({ error: "Failed to fetch cards.", details: err.message });
	}
});

// add a route for srs (put)

cardsRouter.put(
	"/users/:userId/decks/:deckId/cards/:cardId/review",
	async (req, res) => {
		const { cardId } = req.params;
		const { rating } = req.body; // `rating` is 0 (fail) or 1 (pass)

		console.log(rating);

		// Validate rating
		if (![0, 1].includes(rating)) {
			return res
				.status(400)
				.json({ error: "Invalid rating. Use 0 for fail or 1 for pass." });
		}

		try {
			// Fetch the card from the database
			const card = await Card.findOne({ _id: cardId });

			if (!card) {
				return res
					.status(404)
					.json({ error: "Card not found. Please check the IDs provided." });
			}

			// Apply the SM2 algorithm to update the card
			const updatedCardData = updateCardReviewSM2(card, rating);

			// Save the updated card in the database
			const updatedCard = await Card.findByIdAndUpdate(
				cardId,
				updatedCardData,
				{ new: true }
			);

			console.log("card updated");

			res.status(200).json({
				message: "Card reviewed successfully.",
				card: updatedCard,
			});
		} catch (err) {
			console.error("Error reviewing card:", err);
			res.status(500).json({
				error: "An error occurred while reviewing the card.",
				details: err.message,
			});
		}
	}
);

cardsRouter.get("/decks/:deckId/cards/cardlist", async (req, res) => {
	const { deckId } = req.params;

	console.log(deckId);
	try {
		const cards = await Card.find({ deckId });
		if (!cards.length) {
			return res.status(404).json({ message: "No cards found for this deck." });
		}
		res.status(200).json({ cards });
	} catch (err) {
		console.error("Error fetching cards:", err);
		res
			.status(500)
			.json({ error: "Failed to fetch cards.", details: err.message });
	}
});

cardsRouter.post("/users/:userId/decks/:deckId/duplicate", async (req, res) => {
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
				const { _id, ...cardData } = card.toObject();
				return new Card({
					...cardData,
					_id: new mongoose.Types.ObjectId(),
					deckId: duplicatedDeck._id, // Set the new deck ID
				});
			});
			console.log(duplicatedCards);
			await Card.insertMany(duplicatedCards);
		}

		return res
			.status(201)
			.json({ message: "Deck duplicated successfully", deck: duplicatedDeck });
	} catch (error) {
		console.error("Error duplicating deck:", error);
		return res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
});

module.exports = cardsRouter;
