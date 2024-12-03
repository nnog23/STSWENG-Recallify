import React, { useState } from "react";
import { XMarkIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory


const AddCard = () => {
  // State to track form input values
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(null); // State to track error

  const { userId, deckId } = useParams(); // Get userId and deckId from the URL
  const navigate = useNavigate(); // Hook to programmatically navigate after form submission

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "front") {
      setFront(value);
    } else if (name === "back") {
      setBack(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!front || !back) {
      alert("Both fields must be filled out.");
      return;
    }

    const formObject = { front, back };

    try {
      setLoading(true); // Start loading

      // Make POST request to add the card
      const response = await fetch(
        `http://localhost:8000/users/${userId}/decks/${deckId}/cards`, // Dynamically use userId and deckId
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formObject),
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        alert("Card added successfully!");
        navigate(`/users/${userId}/decks/${deckId}`); // Redirect to the deck page after successful card addition
      } else {
        alert("Failed to add card: " + (data.error || data.details));
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while adding the card.");
    } finally {
      setLoading(false); // Stop loading
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
        <h1 className="text-4xl mt-7 mb-6 font-bold text-blue-950">Add Card</h1>
        <div className="w-9/12 flex flex-col items-center mb-7">
          {/* Form for Adding a Card */}
          <form
            id="addCardForm"
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="front"
                className="block text-blue-950 text-lg font-semibold mb-2"
              >
                Front
              </label>
              <textarea
                rows="6"
                type="text"
                id="front"
                name="front"
                value={front}
                onChange={handleInputChange}
                placeholder="Enter the front content"
                className="resize-none w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="back"
                className="block text-blue-950 text-lg font-semibold mb-2"
              >
                Back
              </label>
              <textarea
                rows="5"
                type="text"
                id="back"
                name="back"
                value={back}
                onChange={handleInputChange}
                placeholder="Enter the back content"
                className="resize-none w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Error message */}
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Adding..." : "Add Card"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCard;