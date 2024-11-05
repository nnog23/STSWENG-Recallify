import React, { useState } from "react";

export default function Flashcard({ flashcard }) {
	const [flip, setFlip] = useState(false);

	return (
		// Wrapper div that centers the Flashcard on the screen
		<div className="flex justify-center items-center m-4">
			<div
				className={`relative flex justify-center items-center w-3/4 md:w-1/2 p-6 border border-gray-200 rounded-lg shadow cursor-pointer transition-transform duration-300 transform ${
					flip ? "scale-105" : "scale-100"
				}`}
				onClick={() => setFlip(!flip)}
			>
				{/* Display either the question or the answer based on the flip state */}
				<h5 className="text-xl font-medium tracking-tight text-gray-900 text-center">
					{flip ? flashcard.answer : flashcard.question}
				</h5>
			</div>
		</div>
	);
}

/*
		<div
			className={`card ${flip ? "flip" : ""}`}
			onClick={() => setFlip(!flip)}
			class="flex justify-center bg-black text-red-400"
		>
			<div className="front">{flashcard.question}</div>
			<div className="back">{flashcard.answer}</div>
		</div>
 */
