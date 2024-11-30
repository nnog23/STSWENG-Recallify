import React, { useState } from 'react';

const AddDeck = () => {
  // State to track form input values
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setIsPrivate(checked);
    } else if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
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
      private: isPrivate 
    };

    try {
      const response = await fetch("http://localhost:8000/decks", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert("Deck added successfully!");
        window.location.reload(); // Reload the page to reflect changes
      } else {
        alert("Failed to add deck: " + (data.error || data.details));
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while adding the deck.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl mt-7 mb-6 font-bold text-blue-950">Add Deck</h1>
        <div className="w-9/12 flex flex-col items-center">
          {/* Form for Adding a Deck */}
          <form id="addDeckForm" onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
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
                placeholder="Enter the deck title"
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
                id="description"
                name="description"
                value={description}
                onChange={handleInputChange}
                placeholder="Enter a description (optional)"
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
                className="mr-2"
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
                Add Deck
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Heat Map Section */}
      <div className="h-60 flex flex-col items-center justify-center pt-10">
        <div className="w-10/12 bg-yellow-200 h-40 rounded-tr-3xl rounded-tl-3xl flex items-center justify-center">
          <p className="text-white text-3xl font-bold text-center">Heat Map</p>
        </div>
        <div className="bg-slate-100 w-10/12 h-40 flex items-center justify-center gap-10">
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
};

export default AddDeck;