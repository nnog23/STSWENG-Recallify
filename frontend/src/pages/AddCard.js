import React, { useState } from "react";
import { XMarkIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const AddCard = () => {
	// State to track form input values
	const [front, setFront] = useState("");
	const [back, setBack] = useState("");
	const [loading, setLoading] = useState(false); // State to track loading status
	const [error, setError] = useState(null); // State to track error

	const [selectedCard, setSelectedCard] = useState(null);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [isFlipped, setIsFlipped] = useState(false);

	const { userId, deckId } = useParams(); // Get userId and deckId from the URL
	const navigate = useNavigate(); // Hook to programmatically navigate after form submission

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name === "front") {
			setFront(value);
		} else if (name === "back") {
			setBack(value);
		}
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!front || !back) {
			alert("Both fields must be filled out.");
			return;
		}

		const formObject = { front, back };

		try {
			setLoading(true); // Start loading

			// Make POST request to add the card
			const response = await fetch(
				`https://stsweng-recallify-backend.onrender.com/users/${userId}/decks/${deckId}/cards`, // Dynamically use userId and deckId
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formObject),
				}
			);

			const data = await response.json();

			if (response.status === 201) {
				alert("Card added successfully!");
				setFront("");
				setBack("");
				navigate(`/users/${userId}/decks/${deckId}/cards`); // Redirect to the deck page after successful card addition
			} else {
				alert("Failed to add card: " + (data.error || data.details));
			}
		} catch (err) {
			console.error(err);
			setError("An error occurred while adding the card.");
		} finally {
			setLoading(false); // Stop loading
		}
	};

	const handleBackClick = () => {
		navigate(`/users/${userId}/decks/${deckId}`); // Adjust this path to your deck view route
	};

	// Open the preview modal with the current card
	const openPreview = () => {
		setSelectedCard({ front, back }); // Use current card inputs for preview
		setIsPreviewOpen(true);
	};

	// Close the preview modal
	const closePreview = () => {
		setIsPreviewOpen(false);
		setIsFlipped(false); // Reset flip when closing
	};

	// Flip the card
	const flipCard = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<div className="h-[91vh]">
			{/* Back Button at the top-left */}
			<div className="absolute top-100 left-50 m-6">
				<button
					onClick={handleBackClick}
					className="bg-blue-500 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
				>
					Back to Deck
				</button>
			</div>
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-4xl mt-7 mb-6 font-bold text-blue-950">Add Card</h1>
				<div className="w-9/12 flex flex-col items-center mb-7">
					{/* Form for Adding a Card */}
					<form
						id="addCardForm"
						onSubmit={handleSubmit}
						className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
					>
						<div className="mb-4">
							<label
								htmlFor="front"
								className="block text-blue-950 text-lg font-semibold mb-2"
							>
								Front
							</label>
							<textarea
								rows="6"
								type="text"
								id="front"
								name="front"
								value={front}
								onChange={handleInputChange}
								placeholder="Enter the front content"
								className="resize-none w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div className="mb-4">
							<label
								htmlFor="back"
								className="block text-blue-950 text-lg font-semibold mb-2"
							>
								Back
							</label>
							<textarea
								rows="5"
								type="text"
								id="back"
								name="back"
								value={back}
								onChange={handleInputChange}
								placeholder="Enter the back content"
								className="resize-none w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						{/* Error message */}
						{error && <div className="text-red-500 text-sm mb-4">{error}</div>}

						{/* Preview Button */}
						<button
							type="button"
							onClick={openPreview}
							className="text-black hover:bg-blue-950 hover:text-white rounded-3xl px-3 py-2 text-sm font-medium bg-white shadow-md flex items-center justify-center"
						>
							<EyeIcon className="h-5 w-5 mr-2" aria-hidden="true" />
							Preview
						</button>

						{/* Submit Button */}
						<div className="flex justify-center">
							<button
								type="submit"
								className="bg-blue-500 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
								disabled={loading} // Disable button while loading
							>
								{loading ? "Adding..." : "Add Card"}
							</button>
						</div>
					</form>
				</div>
			</div>

			{/* Card Preview Modal */}
			{isPreviewOpen && selectedCard && (
				<div
					className="fixed inset-0  flex justify-center items-center bg-gray-700 bg-opacity-50 z-50"
					onClick={closePreview}
				>
					<div
						className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-lg"
						onClick={(e) => e.stopPropagation()} // Prevent closing on card click
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
							className={`mt-4 cursor-pointer p-6 rounded-xl shadow-[rgba(7,_65,_210,_0.2)_0px_9px_30px] flex items-center justify-center overflow-auto w-full h-52 max-h-52 ${
								isFlipped ? "bg-blue-200" : "bg-gray-100"
							}`}
							onClick={flipCard}
						>
							<p className="text-center font-medium break-words overflow-hidden">
								{isFlipped ? selectedCard.back : selectedCard.front}
							</p>
						</div>
						<div className="mt-5 flex items-center justify-center">
							<p>{isFlipped ? "Back" : "Front"}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddCard;
