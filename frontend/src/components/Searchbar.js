import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Searchbar({ value, onChange, onSearch }) {
	return (
		<form
			className="flex items-center max-w-lg mx-auto mt-5"
			onSubmit={(e) => {
				e.preventDefault();
				if (onSearch) onSearch(value);
			}}
		>
			<label htmlFor="voice-search" className="sr-only">
				Search
			</label>
			<div className="relative w-full">
				<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
					<MagnifyingGlassIcon
						className="h-5 w-5 mr-3 text-black"
						aria-hidden="true"
					/>
				</div>
				<input
					type="text"
					id="voice-search"
					className="bg-white shadow-sm border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
					placeholder="Search Decks"
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
			</div>
			<button
				type="submit"
				className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-500 rounded-lg border border-blue-700 hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300"
			>
				Search
			</button>
		</form>
	);
}
