// DisplayDeckFlashcards.js
import React, { useState } from "react";
import FlashcardList from "./FlashcardList";
import CreateFlashcard from "./CreateFlashcard"; // Import the CreateFlashcard component

export default function DisplayDeckFlashcards() {
	const [flashcards, setFlashcards] = useState(sample_cards);
	const [nextId, setNextId] = useState(31); // Start the next ID after the last sample ID
	const [isCreating, setIsCreating] = useState(false); // State to control visibility of CreateFlashcard

	// Define the addFlashcard function
	const addFlashcard = (flashcard) => {
		// Add the new flashcard to the existing state
		setFlashcards((prevFlashcards) => [
			...prevFlashcards,
			{ id: nextId, ...flashcard }, // Create a new flashcard object
		]);
		setNextId(nextId + 1); // Increment the ID for the next flashcard
		setIsCreating(false); // Hide the CreateFlashcard form after adding a flashcard
	};

	// Function to toggle the CreateFlashcard visibility
	const toggleCreateFlashcard = () => {
		setIsCreating((prev) => !prev);
	};

	return (
		<>
			<div className="w-full flex flex-col justify-center items-center">
				{/* Button to toggle CreateFlashcard visibility */}
				<button
					onClick={toggleCreateFlashcard}
					className="text-white bg-gray-900 font-semibold py-2 px-4 rounded-lg mt-7 transition duration-200 mx-auto" // Add mx-auto here
				>
					{isCreating ? "Cancel" : "Create Flashcard"}
				</button>

				{/* Conditionally render CreateFlashcard */}
			</div>
			{isCreating && <CreateFlashcard addFlashcard={addFlashcard} />}
			<FlashcardList flashcards={flashcards} />
		</>
	);
}

// Sample data
const sample_cards = [
	{
		id: 10,
		question: "What is 5 + 5?",
		answer: "10",
	},
	{
		id: 20,
		question: "What is 6 + 6?",
		answer: "12",
	},
	{
		id: 30,
		question: "What is 7 + 7?",
		answer: "14",
	},
];
