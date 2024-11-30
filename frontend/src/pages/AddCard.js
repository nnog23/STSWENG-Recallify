import React, { useState } from 'react';

const AddCard = () => {
  // State to track form input values
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'front') {
      setFront(value);
    } else if (name === 'back') {
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
      const response = await fetch("http://localhost:8000/cards", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert("Card added successfully!");
        window.location.reload(); // Reload the page to reflect changes
      } else {
        alert("Failed to add card: " + (data.error || data.details));
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while adding the card.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl mt-7 mb-6 font-bold text-blue-950">Add Card</h1>
        <div className="w-9/12 flex flex-col items-center">
          {/* Form for Adding a Card */}
          <form id="addCardForm" onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label
                htmlFor="front"
                className="block text-blue-950 text-lg font-semibold mb-2"
              >
                Front
              </label>
              <input
                type="text"
                id="front"
                name="front"
                value={front}
                onChange={handleInputChange}
                placeholder="Enter the front content"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="back"
                className="block text-blue-950 text-lg font-semibold mb-2"
              >
                Back
              </label>
              <input
                type="text"
                id="back"
                name="back"
                value={back}
                onChange={handleInputChange}
                placeholder="Enter the back content"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Add Card
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

export default AddCard;