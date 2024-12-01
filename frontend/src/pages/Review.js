import React, { useState, useEffect } from "react";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const Review = () => {
	const [cards, setCards] = useState([]);
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const response = await fetch("http://localhost:8000/cards");
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
	}, []);

	// Open Sidebar with selected card details
	const handleEdit = (card) => {
		setSelectedCard(card);
		setIsSidebarOpen(true);
	};

	// Close Sidebar
	const closeSidebar = () => {
		setIsSidebarOpen(false);
		setSelectedCard(null);
	};

	const handleShowAnswer = () => {
		setShowAnswer(true);
	};

	const handleCardResult = (result) => {
		console.log(`${result} card:`, cards[currentCardIndex]);

		setShowAnswer(false);
		setCurrentCardIndex((prevIndex) =>
			prevIndex < cards.length - 1 ? prevIndex + 1 : prevIndex
		);
	};

	const currentCard = cards[currentCardIndex];

	return (
		<div className="h-[90vh]">
			<div className="flex flex-col items-center w-full px-4 h-auto relative top-0">
				<h1 className="text-4xl mt-7 mb-6 font-bold text-blue-950">
					Review Deck
				</h1>

				{/* Edit Button */}
				<button
					onClick={() => handleEdit(currentCard)}
					className="absolute right-12 top-6 text-gray-700 hover:bg-blue-950 hover:text-white rounded-3xl px-3 py-2 text-sm font-medium bg-white shadow-md flex items-center justify-center"
				>
					<PencilSquareIcon className="h-5 w-5 mr-2" aria-hidden="true" />
					Edit
				</button>

				{currentCard ? (
					<div className="flex flex-col items-center w-[56rem]">
						{/* Front card */}
						<div className="bg-slate-50 p-6 rounded-xl shadow-[rgba(7,_65,_210,_0.2)_0px_9px_30px] mb-6 flex items-center justify-center w-full h-52 max-h-52 overflow-auto relative">
							<p className="absolute top-0 right-0 p-2 text-start align-text-top text-sm text-slate-400 font-medium mr-2 mt-2">
								front
							</p>
							<h3 className="text-xl font-semibold text-center text-blue-950">
								{currentCard.front}
							</h3>
						</div>

						{/* Show answer button */}
						{!showAnswer && (
							<div className="flex flex-col items-center space-y-4 w-full">
								{/* Back card */}
								<div className=" bg-white p-6 rounded-xl opacity-0 flex items-center justify-center w-full h-52 max-h-52 overflow-auto relative"></div>
								<button
									onClick={handleShowAnswer}
									className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-lg mb-4 font-semibold"
								>
									Show Answer
								</button>
							</div>
						)}

						{/* Back card and pass/fail options */}
						{showAnswer && (
							<div className="flex flex-col items-center space-y-4 w-full">
								{/* Back card */}
								<div className="bg-blue-200 p-6 rounded-xl shadow-[rgba(7,_65,_210,_0.2)_0px_9px_30px] flex items-center justify-center w-full h-52 max-h-52 overflow-auto relative">
									<p className="absolute top-0 right-0 p-2 text-start align-text-top text-sm text-slate-400 font-medium mr-2 mt-2">
										back
									</p>
									<p className="text-xl font-semibold text-center text-gray-700">
										{currentCard.back}
									</p>
								</div>

								{/* Pass/Fail buttons */}
								<div className="flex space-x-4 w-full">
									<button
										onClick={() => handleCardResult("Fail")}
										className="w-full bg-slate-300 hover:bg-slate-400 shadow-sm text-black py-2 rounded-lg font-semibold"
									>
										Fail
									</button>
									<button
										onClick={() => handleCardResult("Pass")}
										className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-semibold"
									>
										Pass
									</button>
								</div>
							</div>
						)}
					</div>
				) : (
					<div className="text-center text-lg font-semibold text-gray-700">
						No cards available to review.
					</div>
				)}
			</div>

			{/* Sidebar */}
			<div
				className={`fixed top-16 right-0 h-full bg-white shadow-lg flex flex-col z-50 transition-all duration-300 ${
					isSidebarOpen ? "w-1/3" : "w-0"
				}`}
			>
				{isSidebarOpen && (
					<>
						<div className="p-4 flex justify-between items-center bg-blue-500 text-white h-16">
							<h2 className="text-xl font-semibold">Edit Card</h2>
							<button
								onClick={closeSidebar}
								className="text-white hover:bg-blue-950 rounded-full"
							>
								<XMarkIcon
									className="h-6 w-6 m-1 text-white"
									aria-hidden="true"
								/>
							</button>
						</div>
						<div className="p-4">
							<form>
								<div className="mb-4">
									<label
										htmlFor="front"
										className="block text-sm font-medium text-gray-700"
									>
										Front
									</label>
									<textarea
										id="front"
										value={selectedCard?.front || ""}
										onChange={(e) =>
											setSelectedCard({
												...selectedCard,
												front: e.target.value,
											})
										}
										rows="4" // You can adjust this to change the height of the textarea
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500 p-2.5 resize-none"
									/>
								</div>
								<div className="mb-4">
									<label
										htmlFor="back"
										className="block text-sm font-medium text-gray-700"
									>
										Back
									</label>
									<textarea
										id="back"
										value={selectedCard?.back || ""}
										onChange={(e) =>
											setSelectedCard({
												...selectedCard,
												back: e.target.value,
											})
										}
										rows="5" // You can adjust this to change the height of the textarea
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500 p-2.5 resize-none"
									/>
								</div>
								<button
									type="button"
									onClick={() => {
										// Add logic to save changes here
										console.log("Save changes", selectedCard);
										closeSidebar();
									}}
									className="w-full bg-blue-500 hover:bg-blue-950 text-white py-2 rounded-lg mt-2 font-semibold"
								>
									Save Changes
								</button>
							</form>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Review;
