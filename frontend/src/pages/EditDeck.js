import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditDeck = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const navigate = useNavigate();
  const { userId, deckId } = useParams();

  // Fetch deck details to populate the form for editing
  useEffect(() => {
    const fetchDeckDetails = async () => {
      try {

        const response = await fetch(`http://localhost:8000/users/${userId}/decks/${deckId}`);
        const data = await response.json();

        if (response.status === 200) {
          setTitle(data.deck.title);
          setDescription(data.deck.description);
          setIsPrivate(data.deck.private);
        } else {
          alert("Failed to fetch deck details: " + (data.error || data.details));
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while fetching deck details.");
      }
    };

    fetchDeckDetails();
  }, [userId, deckId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setIsPrivate(checked);
    } else if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("The title field must be filled out.");
      return;
    }

    const formObject = {
      title,
      description,
      private: isPrivate,
      userId: userId,
    };

    try {
      const response = await fetch(`http://localhost:8000/users/${userId}/decks/${deckId}/editdeck`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      });

      const data = await response.json();

      if (response.status === 200) {
        alert("Deck updated successfully!");
        navigate(`/users/${userId}/decks/decklist`); // go back to decklist page
      } else {
        alert("Failed to update deck: " + (data.error || data.details));
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating the deck.");
    }
  };

  const handleBackClick = () => {
    navigate(`/users/${userId}/decks/${deckId}`); // Adjust this path to your deck view route
  };

  return (
    <>
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
        
        <h1 className="text-4xl mt-7 mb-6 font-bold text-blue-950">Edit Deck</h1>
        <div className="w-9/12 flex flex-col items-center mb-7">
          {/* Form for Editing a Deck */}
          <form
            id="editDeckForm"
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-blue-950 text-lg font-semibold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleInputChange}
                placeholder={title || "Enter the deck title"} // Placeholder shows current title
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-blue-950 text-lg font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                rows="12"
                id="description"
                name="description"
                value={description}
                onChange={handleInputChange}
                placeholder={description || "Enter a description (optional)"} // Placeholder shows current description
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="private"
                name="private"
                checked={isPrivate}
                onChange={handleInputChange}
                className="mr-3 ml-1 w-5 h-5"
              />
              <label
                htmlFor="private"
                className="text-blue-950 text-lg font-semibold"
              >
                Private Deck
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Update Deck
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditDeck;
