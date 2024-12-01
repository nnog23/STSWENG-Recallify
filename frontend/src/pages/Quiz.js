import React, { useState, useEffect } from "react";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const Quiz = () => {
	const [cards, setCards] = useState([]);
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [isShowingAnswer, setIsShowingAnswer] = useState(false);
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

	// Toggle between front and back of the card
	const toggleCard = () => {
		setIsShowingAnswer((prev) => !prev);
	};

	// Move to the next card
	const nextCard = () => {
		setIsShowingAnswer(false); // Hide the back before going to the next card
		setCurrentCardIndex((prevIndex) =>
			prevIndex < cards.length - 1 ? prevIndex + 1 : prevIndex
		);
	};

	const currentCard = cards[currentCardIndex];

	return (
		<div className="h-[90vh]">
			<div
				className={`flex flex-col items-center w-full px-4 h-auto relative top-0 transition-all duration-300 ${
					isSidebarOpen ? "w-2/3" : "w-full"
				}`}
			>
				<h1 className="text-4xl mt-7 mb-6 font-bold text-blue-950">Quiz</h1>

				{/* Edit Button - Pass currentCard here */}
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
						<div
							className={`bg-slate-50 p-6 rounded-xl shadow-[rgba(7,_65,_210,_0.2)_0px_9px_30px] mb-6 flex items-center justify-center w-full h-52 max-h-52 overflow-auto relative ${
								isShowingAnswer ? "hidden" : ""
							}`}
						>
							<p className="absolute top-0 right-0 p-2 text-start align-text-top text-sm text-slate-400 font-medium mr-2 mt-2">
								front
							</p>
							<h3 className="text-xl font-semibold text-center text-blue-950">
								{currentCard.front}
							</h3>
						</div>

						{/* Back card */}
						<div
							className={`bg-blue-200 p-6 rounded-xl shadow-[rgba(7,_65,_210,_0.2)_0px_9px_30px] flex items-center justify-center w-full h-52 max-h-52 overflow-auto relative mb-6 ${
								!isShowingAnswer ? "hidden" : ""
							}`}
						>
							<p className="absolute top-0 right-0 p-2 text-start align-text-top text-sm text-slate-400 font-medium mr-2 mt-2">
								back
							</p>
							<p className="text-xl font-semibold text-center text-gray-700">
								{currentCard.back}
							</p>
						</div>

						{/* Buttons at the bottom */}
						<div className="flex space-x-4 w-full mb-4">
							<button
								onClick={toggleCard}
								className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
							>
								Toggle Card
							</button>
							<button
								onClick={nextCard}
								className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-semibold"
							>
								Next
							</button>
						</div>
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
										rows="4"
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
										rows="5"
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

export default Quiz;
