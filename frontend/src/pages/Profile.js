import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
    const [user, setUser] = useState(null); // For storing user profile data
    const [decks, setDecks] = useState([]); // For storing user's decks
    const [username, setUsername] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [bio, setBio] = useState(null);
    const token = localStorage.getItem('authToken');
    const { userId } = useParams();
    
    useEffect(() => {
        // Fetch user profile data
        const fetchUserProfile = async () => {
            try {

                const response = await fetch(`http://localhost:8000/users/${userId}/profile`,{

                    headers: {
                        'Authorization': `Bearer ${token}`, // Replace with your JWT token
                      },
                });
                const data = await response.json();
                
                setUsername(data.username); 
                setProfilePicture(data.profilePicture); 
                setBio(data.bio); 

            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
    

        // Fetch user's decks data
        const fetchUserDecks = async () => {
            try {
                const response = await fetch(`http://localhost:8000/users/${userId}/decks/decklist`);
                const data = await response.json();
                setDecks(data.decks); // Set decks data to state
            } catch (error) {
                console.error("Error fetching user decks:", error);
            }
        };

        fetchUserProfile();
        fetchUserDecks();

    }, [userId]);

    return (
        <>
            <div className="h-80 flex justify-center pt-10 space-x-6">
                {/* Profile Section */}
                <div id="profile-card" className="w-1/4 max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Picture */}
                    <div className="flex justify-center items-center relative">
                        <img
                            id="profile-picture"
                            className="rounded-full w-40 h-40 object-cover"
                            src={profilePicture || "https://via.placeholder.com/150"}
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
                        <h2 id="profile-name" className="text-xl font-semibold text-gray-800">
                            {username || "John Doe"}
                        </h2>
                        {/* Bio */}
                        <p id="profile-bio" className="text-gray-600 mt-2">
                            {bio || "Hi! This is my bio."}
                        </p>
                        {/* Edit button for bio */}
                        <button className="mt-2 text-blue-500 font-semibold">
                            Edit Bio
                        </button>
                    </div>
                </div>

                {/* Heatmap */}
                <div className="w-1/2 bg-yellow-200 rounded-tr-3xl rounded-tl-3xl flex items-center justify-center">
                    <p className="text-white text-3xl font-bold text-center">Heat Map</p>
                </div>
            </div>
            
            {/* Decks Section */}
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl mt-7 mb-6 font-bold text-blue-950">Decks</h1>
                <div className="w-9/12 grid grid-cols-4 grid-rows-[auto_1fr_auto_auto] gap-x-5 gap-y-5">
                    {decks.length === 0 ? (
                        <div>No decks available</div> // Display if no decks found
                    ) : (
                        decks.map((deck, index) => {
                            const randomNumber = Math.floor(Math.random() * 101) + 100;
                            const randomRepeatCount = Math.floor(Math.random() * 8) + 1;
                            const itemText = Array(randomRepeatCount).fill("Item").join(" ");

                            return (
                                <div
                                    key={deck.id || index}
                                    className="relative bg-blue-500 p-4 rounded-2xl shadow-md grid grid-rows-subgrid row-span-4 border-8 border-blue-200"
                                >
                                    {/* Overlapping Bubble Badge */}
                                    <div className="absolute -top-3 -right-3 bg-yellow-300 text-white text-s font-bold py-1 px-2 rounded-full shadow-lg">
                                        {randomNumber}
                                    </div>

                                    {/* Blue Box */}
                                    <div className="bg-white p-2 rounded-lg overflow-hidden">
                                        <img
                                            src="https://via.placeholder.com/150"
                                            alt="Placeholder"
                                            className="w-full h-auto object-cover rounded-lg"
                                        />
                                    </div>

                                    {/* Deck Name */}
                                    <div className="text-white text-xl font-semibold text-center">
                                        {deck.title || itemText}
                                    </div>

                                    {/* Deck Description */}
                                    <div className="text-white text-sm text-center">
                                        {deck.description ||
                                            Array.from({ length: Math.floor(Math.random() * 10) + 5 })
                                                .map(() => "word")
                                                .join(" ") + "."}
                                    </div>

                                    {/* Deck Date */}
                                    <div className="text-white text-xs text-center mt-auto">
                                        {new Date(deck.createdAt || Date.now()).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}

