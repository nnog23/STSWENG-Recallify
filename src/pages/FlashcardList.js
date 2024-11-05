import React from "react";
import Flashcard from "./Flashcard";

export default function FlashcardList({ flashcards }) {
	return (
		<>
			<div className="flex justify-center items-center w-full pt-4">
				{/* Container for black and purple divs with 3/4 width */}
				<div className="flex w-3/4 md:w-1/2">
					{/* Black div with 4/5 width */}
					<div className="w-4/5 p-4">
						<h5 className="mb-2 text-4xl text-left font-bold tracking-tight text-gray-900">
							Deck Name
						</h5>
						<h4 className="text-left text-sm">
							Deck Description Deck Description Deck Description Deck
							Description Deck Description Deck Description Description Deck
							Description Deck Description
						</h4>
					</div>

					{/* Purple div with 1/5 width, with Add button at bottom */}
					<div className="w-1/5 flex flex-col justify-center items-end text-white text-lg">
						{/* <img
							width="32"
							height="32"
							src="https://img.icons8.com/external-anggara-glyph-anggara-putra/64/external-add-button-social-media-interface-anggara-glyph-anggara-putra.png"
							alt="Add button"
						/> */}
					</div>
				</div>
			</div>

			{/* Flashcard count with lines on each side */}
			<div className="flex items-center w-3/4 md:w-1/2 mx-auto mt-2 mb-6">
				<hr className="flex-grow border-t border-gray-300" />
				<span className="mx-4 text-gray-700">{flashcards.length} Cards</span>
				<hr className="flex-grow border-t border-gray-300" />
			</div>

			{/* Flashcard Grid */}
			<div className="card-grid">
				{flashcards.map((flashcard) => (
					<Flashcard flashcard={flashcard} key={flashcard.id} />
				))}
			</div>
		</>
	);
}
