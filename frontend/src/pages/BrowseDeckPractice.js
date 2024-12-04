import React, { useState, useEffect } from "react";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useParams, useNavigate } from "react-router-dom";

const Practice = () => {
	const [cards, setCards] = useState([]);
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);
	const navigate = useNavigate();
	const { userId, deckId } = useParams();

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const response = await fetch(
					`http://localhost:8000/decks/${deckId}/cards/cardlist`
				);
				const data = await response.json();

				if (response.status === 200) {
					setCards(data.cards);
				} else {
					console.error("Failed to fetch cards:", data.error || data.details);
				}
			} catch (err) {
				console.error("Error fetching cards:", err);
			}
		};

		fetchCards();
	}, [userId, deckId]);

	const handleShowAnswer = () => {
		setShowAnswer(true);
	};

	const handleCardResult = (result) => {
		// Move to the next card, if not the last one
		if (currentCardIndex < cards.length - 1) {
			setShowAnswer(false);
			setCurrentCardIndex((prevIndex) => prevIndex + 1);
		} else {
			// Handle the case when we reach the last card
			setShowAnswer(false);
			setCurrentCardIndex(cards.length); // Or set it to a value indicating the end of practice
		}
	};

	const handleBackClick = () => {
		navigate(`/decks/${deckId}/deckview`); // Adjust this path to your deck view route
	};

	const handleReset = () => {
		setCurrentCardIndex(0); // Reset to the first card
		setShowAnswer(false); // Hide the answer
	};

	const currentCard = cards[currentCardIndex];

	return (
		<div className="h-[90vh]">
			{/* Back Button at the top-left */}
			<div className="absolute top-100 left-50 z-50 m-6">
				<button
					onClick={handleBackClick}
					className="bg-blue-500 ml-32 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
				>
					Back
				</button>
			</div>

			<div className="flex flex-col items-center w-full px-4 h-auto relative top-0">
				<h1 className="text-4xl mt-7 mb-6 font-bold text-blue-950">Practice</h1>

				{currentCard ? (
					<div className="flex flex-col items-center w-[56rem]">
						<div className="bg-slate-50 p-6 rounded-xl shadow-lg mb-6 flex items-center justify-center w-full h-52 max-h-52 overflow-auto relative">
							<p className="absolute top-0 right-0 p-2 text-start align-text-top text-sm text-slate-400 font-medium mr-2 mt-2">
								front
							</p>
							<h3 className="text-xl font-semibold text-center text-blue-950">
								{currentCard.front}
							</h3>
						</div>

						{!showAnswer && (
							<div className="flex flex-col items-center space-y-4 w-full">
								<div className=" bg-white p-6 rounded-xl opacity-0 flex items-center justify-center w-full h-52 max-h-52 overflow-auto relative"></div>
								<button
									onClick={handleShowAnswer}
									className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-lg mb-4 font-semibold"
								>
									Show Answer
								</button>
							</div>
						)}

						{showAnswer && (
							<div className="flex flex-col items-center space-y-4 w-full">
								<div className="bg-blue-200 p-6 rounded-xl shadow-lg flex items-center justify-center w-full h-52 max-h-52 overflow-auto relative">
									<p className="absolute top-0 right-0 p-2 text-start align-text-top text-sm text-slate-400 font-medium mr-2 mt-2">
										back
									</p>
									<p className="text-xl font-semibold text-center text-gray-700">
										{currentCard.back}
									</p>
								</div>

								<div className="flex space-x-4 w-full">
									<button
										onClick={() => handleCardResult("Next")}
										className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-semibold"
									>
										Next
									</button>
								</div>
							</div>
						)}
					</div>
				) : (
					<div className="text-center text-lg font-semibold text-gray-700">
						No cards available to practice.
					</div>
				)}

				{/* Reset Button */}
				{currentCardIndex >= cards.length && (
					<div className="mt-6">
						<button
							onClick={handleReset}
							className="bg-orange-500 hover:bg-orange-600 text-white text-lg py-3 px-6 rounded-lg shadow-md font-semibold"
						>
							Restart Practice
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Practice;
