import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Searchbar from "../components/Searchbar";

export default function Browse() {
	// State for search query
	const [searchQuery, setSearchQuery] = useState("");
	const [decks, setDecks] = useState([]);
	const [loading, setLoading] = useState(true);

	// Fetch public decks from the backend
	// Fetch public decks and due cards from the backend
	useEffect(() => {
		const fetchDecks = async () => {
			setLoading(true);
			try {
				const response = await fetch("https://stsweng-recallify-backend.onrender.com/browse"); // Replace with your API endpoint
				if (!response.ok) {
					throw new Error("Failed to fetch public decks");
				}
				const data = await response.json();

				// Fetch the number of due cards for each public deck
				const updatedDecks = await Promise.all(
					data.map(async (deck) => {
						try {
							const dueResponse = await fetch(
								`https://stsweng-recallify-backend.onrender.com/decks/${deck._id}/cards/due`
							); // Adjust the endpoint based on your API
							if (!dueResponse.ok) {
								throw new Error(
									`Failed to fetch due cards for deck ${deck._id}`
								);
							}
							const dueData = await dueResponse.json();
							return { ...deck, dueCards: dueData.numberofcards || 0 };
						} catch (error) {
							console.error("Error fetching due cards:", error);
							return { ...deck, dueCards: 0 }; // Default to 0 if fetching fails
						}
					})
				);
				
				setDecks(updatedDecks);
			} catch (error) {
				console.error("Error fetching decks:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchDecks();
	}, []);

	// Filter decks based on the search query
	const filteredDecks = decks.filter((deck) =>
		deck.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<>
			<div className="mt-10 mb-6">
				<Searchbar />
			</div>

			<div className="flex flex-col items-center mt-10 min-h-screen">
				<div className="w-9/12 flex flex-row items-start justify-start">
					<h1 className="pl-3 text-4xl mb-6 font-bold text-blue-950 text-left">
						Browse Decks
					</h1>
				</div>
				<div className="w-9/12 grid grid-cols-4 grid-rows-[auto_1fr_auto_auto_auto] gap-x-5 gap-y-5">
					{filteredDecks.length > 0 ? (
						filteredDecks.map((deck) => (
							<Link
								key={deck._id}
								to={`/decks/${deck._id}/deckview`}
								className="relative bg-blue-500 p-4 rounded-2xl shadow-md grid grid-rows-subgrid row-span-4 border-8 border-blue-200 hover:scale-105 transition-transform"
							>
								{/* Overlapping Bubble Badge */}
								<div className="absolute -top-3 -right-3 bg-orange-500 hover:bg-orange-600 text-white text-s font-bold py-1 px-2 rounded-full shadow-lg">
									{deck.dueCards}
								</div>

								{/* Blue Box */}
								<div className="bg-white p-2 rounded-lg overflow-hidden">
									<img
										src={deck.imageUrl || "https://via.placeholder.com/150"}
										alt="Deck Thumbnail"
										className="w-full h-auto object-cover rounded-lg"
									/>
								</div>

								{/* Name */}
								<div className="text-white text-xl font-semibold text-center">
									{deck.title}
								</div>

								{/* Description */}
								<div className="text-white text-sm text-center">
									{deck.description || "No description available."}
								</div>

								{/* Date */}
								<div className="text-white text-xs text-center mt-auto">
									{new Date(deck.dateCreated).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</div>
							</Link>
						))
					) : (
						<p className="text-gray-500 col-span-4 text-center">
							No decks found matching "{searchQuery}".
						</p>
					)}
				</div>
			</div>
			<div className="h-40"></div>
		</>
	);
}
