export default function Home() {
	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen">
				<h1 className="text-4xl mt-7 mb-6 font-bold text-blue-950">Decks</h1>
				<div className="w-9/12 grid grid-cols-4 grid-rows-[auto_1fr_auto_auto] gap-x-5 gap-y-5">
					{Array.from({ length: 8 }).map((_, index) => {
						// Generate a random number between 100 and 200
						const randomNumber = Math.floor(Math.random() * 101) + 100;

						// Generate a random number between 1 and 10 for repetition
						const randomRepeatCount = Math.floor(Math.random() * 8) + 1;

						// Generate the repeated "Item" string
						const itemText = Array(randomRepeatCount).fill("Item").join(" ");

						return (
							<div
								key={index}
								className="relative bg-blue-500 p-4 rounded-2xl shadow-md grid grid-rows-subgrid row-span-4 border-8 border-blue-200 "
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

								{/* Name */}
								<div className="text-white text-xl font-semibold text-center">
									{itemText}
								</div>

								{/* Description */}
								<div className="text-white text-sm text-center">
									{Array.from({ length: Math.floor(Math.random() * 10) + 5 })
										.map(() => "word")
										.join(" ") + "."}
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
			<div className=" h-60 flex flex-col items-center justify-center pt-10">
				<div className="w-10/12 bg-yellow-200 h-40 rounded-tr-3xl rounded-tl-3xl flex items-center justify-center">
					<p className="text-white text-3xl font-bold text-center">Heat Map</p>
				</div>
				<div className="bg-slate-100 w-10/12  h-40 flex items-center justify-center gap-10">
					<p className="text-blue-950 text-lg font-semibold text-center">
						Daily Average:
					</p>
					<p className="text-blue-950 text-lg font-semibold text-center">
						Current Streak:
					</p>
				</div>
			</div>
		</>
	);
}
