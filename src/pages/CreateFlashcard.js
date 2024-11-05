// CreateFlashcard.js
import React, { useState } from "react";

export default function CreateFlashcard({ addFlashcard }) {
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (question && answer) {
			addFlashcard({ question, answer }); // Call the addFlashcard function
			setQuestion(""); // Clear the input
			setAnswer(""); // Clear the input
		}
	};

	return (
		<div className="flex justify-center items-center mt-5">
			<div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
				<h2 className="text-2xl font-bold mb-4 text-center">
					Create Flashcard
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Question
						</label>
						<input
							type="text"
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
							placeholder="Enter the question"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Answer
						</label>
						<input
							type="text"
							value={answer}
							onChange={(e) => setAnswer(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
							placeholder="Enter the answer"
						/>
					</div>
					<div className="flex justify-center">
						<button
							type="submit"
							className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-200"
						>
							Add to Deck
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
