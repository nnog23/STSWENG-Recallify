import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DeleteDeck = () => {
    // State to track confirmation input and deck name
    const [confirm, setConfirm] = useState("");
    const [deckName, setDeckName] = useState("");
    const navigate = useNavigate();
    const { userId, deckId } = useParams();

    // Fetch the deck's name on component mount
    useEffect(() => {
        const fetchDeck = async () => {
            try {
                const response = await fetch(`https://stsweng-recallify-backend.onrender.com/users/${userId}/decks/${deckId}`);
                const data = await response.json();

                if (response.status === 200) {
                    setDeckName(data.deck.title); // Assuming 'name' is the field that stores the deck's name
                } else {
                    alert("Failed to fetch deck details: " + (data.error || data.details));
                }
            } catch (err) {
                console.error(err);
                alert("An error occurred while fetching deck details.");
            }
        };

        fetchDeck();
    }, [userId, deckId]);

    // Handle input changes
    const handleInputChange = (e) => {
        setConfirm(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (confirm !== "DELETE") {
            alert("Please type 'DELETE' to confirm.");
            return;
        }

        try {
            const response = await fetch(`https://stsweng-recallify-backend.onrender.com/users/${userId}/decks/${deckId}/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.status === 200) {
                alert("Deck deleted successfully!");
                navigate(`/users/${userId}/decks/decklist`); // Redirect to another page after deletion
            } else {
                alert("Failed to delete deck: " + (data.error || data.details));
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while deleting the deck.");
        }
    };

    const handleBackClick = () => {
        navigate(`/users/${userId}/decks/${deckId}`); // Adjust this path to your deck view route
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
                {/* Dynamic Title */}
                <h1 className="text-4xl mt-7 mb-6 font-bold text-blue-950">
                    Delete Deck: {deckName || "Loading..."} {/* Display deck name or "Loading..." while fetching */}
                </h1>
                <div className="w-9/12 flex flex-col items-center mb-7">
                    {/* Form for Deleting a Deck */}
                    <form
                        id="deleteDeckForm"
                        onSubmit={handleSubmit}
                        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
                    >
                        <div className="mb-4">
                            <label
                                htmlFor="confirm"
                                className="block text-blue-950 text-lg font-semibold mb-2"
                            >
                                Type 'DELETE' to confirm
                            </label>
                            <input
                                type="text"
                                id="confirm"
                                name="confirm"
                                value={confirm}
                                onChange={handleInputChange}
                                placeholder="Type 'DELETE' to confirm"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-red-500 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition"
                            >
                                Delete Deck
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DeleteDeck;
