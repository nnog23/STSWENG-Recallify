import React, { useState, useEffect } from "react";
import {
	PencilSquareIcon,
	EyeIcon,
	XMarkIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import { useParams, useNavigate } from "react-router-dom";

const Cardtable = () => {
	const [cards, setCards] = useState([]);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [isFlipped, setIsFlipped] = useState(false);
	const navigate = useNavigate();
	const { userId, deckId } = useParams();

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const response = await fetch(
					`http://localhost:8000/users/${userId}/decks/${deckId}/cards/cardlist`
				);
				const data = await response.json();

				if (response.status === 200) {
					setCards(data.cards); // Set cards from `data.cards`
				} else {
					console.error("Failed to fetch cards:", data.error || data.details);
				}
			} catch (err) {
				console.error("Error fetching cards:", err);
			}
		};

		fetchCards();
	}, [userId, deckId]);

	const handleEdit = (card) => {
		setSelectedCard(card);
		setIsSidebarOpen(true);
	};

	const handleDelete = async (card) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this card?"
		);
		if (!confirmDelete) return;

		try {
			const response = await fetch(
				`http://localhost:8000/users/${userId}/decks/${deckId}/cards/${card._id}/delete`,
				{
					method: "DELETE",
				}
			);

			const data = await response.json();

			if (response.status === 200) {
				// Remove the card from the cards state
				setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
			} else {
				console.error("Failed to delete card:", data.error || data.details);
			}
		} catch (err) {
			console.error("Error deleting card:", err);
		}
	};

	const closeSidebar = () => {
		setIsSidebarOpen(false);
		setSelectedCard(null);
	};

	const openPreview = (card) => {
		setSelectedCard(card);
		setIsPreviewOpen(true);
	};

	const closePreview = () => {
		setIsPreviewOpen(false);
		setIsFlipped(false);
	};

	const flipCard = () => {
		setIsFlipped(!isFlipped);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!selectedCard) return;

		const { front, back } = selectedCard;
		const cardId = selectedCard._id;
		try {
			const response = await fetch(
				`http://localhost:8000/users/${userId}/decks/${deckId}/cards/${cardId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						front,
						back,
					}),
				}
			);

			const data = await response.json();

			if (response.status === 200) {
				setCards((prevCards) =>
					prevCards.map((card) =>
						card._id === selectedCard._id ? { ...card, front, back } : card
					)
				);
				closeSidebar();
			} else {
				console.error("Failed to update card:", data.error || data.details);
			}
		} catch (err) {
			console.error("Error updating card:", err);
		}
	};

	const handleBackClick = () => {
		navigate(`/users/${userId}/decks/${deckId}`); // Adjust this path to your deck view route
	};

	return (
		<div className="flex w-full h-full">
			{/* Back Button at the top-left */}
			<div className="absolute top-100 left-50 m-6">
				<button
					onClick={handleBackClick}
					className="bg-blue-500 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
				>
					Back to Deck
				</button>
			</div>
			{/* Main Content */}
			<div
				className={`transition-all duration-300 ${
					isSidebarOpen ? "w-2/3" : "w-full"
				}`}
			>
				<div className="flex flex-col items-center w-full">
					<h1 className="text-4xl mt-7 mb-6 font-bold text-blue-950">
						Card List
					</h1>

					<div
						className={`overflow-x-auto ${
							isSidebarOpen ? "w-12/12 mx-5" : "w-10/12"
						}`}
					>
						<table className="min-w-full w-full table-fixed border-collapse border border-gray-300">
							<thead>
								<tr className="bg-gray-100 text-gray-700">
									<th className="w-2/6 px-4 py-2 border-r border-b">Front</th>
									<th className="w-2/6 px-4 py-2 border-r border-b">Back</th>
									<th className="w-1/6 px-4 py-2 border-r border-b">
										Due Date
									</th>
									<th className="w-1/6 px-4 py-2 border-b">Action</th>
								</tr>
							</thead>
							<tbody>
								{cards.length > 0 ? (
									cards.map((card) => (
										<tr key={card._id} className="bg-white">
											<td className="w-2/5 px-4 py-2 border-r border-b truncate">
												{card.front}
											</td>
											<td className="w-2/5 px-4 py-2 border-r border-b truncate">
												{card.back}
											</td>
											<td className="w-1/5 px-4 py-2 border-r border-b">
												{new Date(card.dateCreated).toLocaleDateString()}
											</td>
											<td className="w-1/5 px-4 py-2 border-b">
												<div
													className={`flex items-center ${
														isSidebarOpen
															? "gap-x-2 justify-center"
															: "justify-between flex-nowrap space-x-1"
													}`}
												>
													<button
														onClick={() => handleEdit(card)}
														className="text-gray-700 hover:bg-blue-950 hover:text-white rounded-3xl px-3 py-2 text-sm font-medium bg-white shadow-md flex items-center justify-center"
													>
														<PencilSquareIcon
															className="h-5 w-5 mr-2"
															aria-hidden="true"
														/>
														{isSidebarOpen ? "" : "Edit"}
													</button>
													<button
														onClick={() => openPreview(card)}
														className="text-black hover:bg-blue-950 hover:text-white rounded-3xl px-3 py-2 text-sm font-medium bg-white shadow-md flex items-center justify-center"
													>
														<EyeIcon className="h-5 w-5" aria-hidden="true" />
														{isSidebarOpen ? "" : ""}
													</button>
													<button
														onClick={() => handleDelete(card)}
														className="text-gray-700 hover:bg-blue-950 hover:text-white rounded-3xl px-3 py-2 text-sm font-medium bg-white shadow-md flex items-center justify-center"
													>
														<TrashIcon className="h-5 w-5" aria-hidden="true" />
														{isSidebarOpen ? "" : ""}
													</button>
												</div>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan="4" className="px-4 py-2 text-center">
											No cards available
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* Card Preview Modal */}
			{isPreviewOpen && selectedCard && (
				<div
					className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50"
					onClick={closePreview}
				>
					<div
						className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-sm"
						onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
					>
						<div className="flex justify-between">
							<h2 className="text-xl font-semibold">Card Preview</h2>
							<button
								onClick={closePreview}
								className="text-gray-600 hover:text-gray-800"
							>
								<XMarkIcon
									className="text-gray-600 h-5 w-5"
									aria-hidden="true"
								/>
							</button>
						</div>

						<div
							className={`mt-4 cursor-pointer  p-6 rounded-xl shadow-[rgba(7,_65,_210,_0.2)_0px_9px_30px] flex items-center justify-center overflow-auto w-full h-52 max-h-52 ${
								isFlipped ? "bg-blue-200" : "bg-gray-100"
							}`}
							onClick={flipCard}
						>
							<p className="text-center font-medium">
								{isFlipped ? selectedCard.back : selectedCard.front}
							</p>
						</div>
						<div className=" mt-5 flex items-center justify-center">
							<p>{isFlipped ? "Back" : "Front"}</p>
						</div>
					</div>
				</div>
			)}

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
								<XMarkIcon className="h-5 w-5" aria-hidden="true" />
							</button>
						</div>

						<form className="p-6" onSubmit={handleSubmit}>
							<div className="mb-4">
								<label className="block text-gray-700">Front</label>
								<textarea
									rows="4"
									value={selectedCard?.front || ""}
									onChange={(e) =>
										setSelectedCard({
											...selectedCard,
											front: e.target.value,
										})
									}
									className="w-full p-2 border rounded-lg"
								></textarea>
							</div>

							<div className="mb-4">
								<label className="block text-gray-700">Back</label>
								<textarea
									rows="4"
									value={selectedCard?.back || ""}
									onChange={(e) =>
										setSelectedCard({
											...selectedCard,
											back: e.target.value,
										})
									}
									className="w-full p-2 border rounded-lg"
								></textarea>
							</div>

							<div className="flex justify-end">
								<button
									type="submit"
									className="px-4 py-2 bg-blue-500 text-white rounded-lg"
								>
									Save Changes
								</button>
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	);
};

export default Cardtable;
