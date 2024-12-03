export default function Profile() {
    return (
        <>
            <div className="h-80 flex justify-center pt-10 space-x-6">
                {/* For profile */}
                <div id="profile-card" className="w-1/4 max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Picture */}
                    <div className="flex justify-center items-center relative">
                        <img 
                            id="profile-picture" 
                            className="rounded-full w-40 h-40 object-cover" 
                            src="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e9ea16121c4a0759ffbb_53.png" 
                            alt="Profile Picture"
                        />
                        {/* Edit button for picture */}
                        <button className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                            Edit
                        </button>
                    </div>
                    {/* Content */}
                    <div className="p-4">
                        {/* Name */}
                        <h2 id="profile-name" className="text-xl font-semibold text-gray-800">John Doe</h2>
                        {/* Bio */}
                        <p id="profile-bio" className="text-gray-600 mt-2">
                            Hi! This is my bio.
                        </p>
                        {/* Edit button for bio */}
                        <button className="mt-2 text-blue-500 font-semibold">
                            Edit Bio
                        </button>
                    </div>
                </div>

                {/* For heatmap */}
                <div className="w-1/2 bg-yellow-200 rounded-tr-3xl rounded-tl-3xl flex items-center justify-center">
                    <p className="text-white text-3xl font-bold text-center">Heat Map</p>
                </div>
            </div>

            {/* Decks */}
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
        </>
    );
}