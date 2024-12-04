import Searchbar from "../components/Searchbar";

export default function Browse() {
	return (
		<>
			<div className="mt-10 mb-6">
				<Searchbar />
			</div>

			<div className="flex flex-col items-center justify-center min-h-screen">
				<div className="w-9/12 flex flex-row items-start justify-start">
					<h1 className="pl-3 text-4xl mb-6 font-bold text-blue-950 text-left">
						Browse Decks
					</h1>
				</div>
				<div className="w-9/12 grid grid-cols-4 grid-rows-[auto_1fr_auto_auto_auto] gap-x-5 gap-y-5">
					{Array.from({ length: 12 }).map((_, index) => {
						// Generate a random number between 100 and 200
						const randomNumber = Math.floor(Math.random() * 101) + 100;

						// Generate a random number between 1 and 10 for repetition
						const randomRepeatCount = Math.floor(Math.random() * 8) + 1;

						// Generate the repeated "Item" string
						const itemText = Array(randomRepeatCount).fill("Item").join(" ");

						const itemOwner = "Owner's Name";

						return (
							<div
								key={index}
								className="relative bg-blue-500 p-4 rounded-2xl shadow-md grid grid-rows-subgrid row-span-5 border-8 border-blue-200 "
							>
								{/* Overlapping Bubble Badge */}
								<div className="absolute -top-3 -right-3 bg-yellow-300 text-white text-s font-bold py-1 px-2 rounded-full shadow-lg">
									{randomNumber}
								</div>

								{/* Blue Box */}
								{/* Smaller Box for Image */}
								<div className="bg-white p-2 rounded-lg overflow-hidden">
									<img
										src="https://via.placeholder.com/150"
										alt="Placeholder"
										className="w-full h-auto object-cover rounded-lg"
									/>
								</div>

								{/* Deck Name */}
								<div className="text-white text-xl font-semibold text-center">
									{itemText}
								</div>

								{/* Description */}
								<div className="text-white text-sm text-center">
									{Array.from({ length: Math.floor(Math.random() * 10) + 5 })
										.map(() => "word")
										.join(" ") + "."}
								</div>

								{/* Owner Name */}
								<div className="text-white text-sm text-center mt-auto font-semibold flex items-center justify-center">
									{/* Owner's Icon */}
									<img
										alt="Owner Icon"
										src="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e9ea16121c4a0759ffbb_53.png"
										className="h-8 w-8 rounded-full mr-2 border-2"
									/>
									{itemOwner}
								</div>

								{/* Date */}
								<div className="text-white text-xs text-center mt-auto">
									{new Date().toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="h-40"></div>
		</>
	);
}
