import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useParams, useNavigate } from "react-router-dom";

const Quiz = () => {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  const { userId, deckId } = useParams();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`http://localhost:8000/users/${userId}/decks/${deckId}/cards`);
        const data = await response.json();

        if (response.status === 200) {
          setCards(data.cards);
        } else {
          console.error("Failed to fetch cards:", data.error || data.details);
        }
      } catch (err) {
        console.error("Error fetching cards:", err);
      }
    };

    fetchCards();
  }, [userId, deckId]);

  const handleEdit = (card) => {
    setSelectedCard(card);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedCard(null);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleCardResult = (result) => {
    // Since there is no need to update the card, we'll just move to the next card
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) =>
      prevIndex < cards.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handleBackClick = () => {
    navigate(`/users/${userId}/decks/${deckId}`); // Adjust this path to your deck view route
  };

  const currentCard = cards[currentCardIndex];

  return (
    <div className="h-[90vh]">
		
            {/* Back Button at the top-left */}
            <div className="absolute top-100 left-50 z-50 m-6">
        <button
          onClick={handleBackClick}
          className="bg-blue-500 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Back to Deck
        </button>
      </div>
      <div className="flex flex-col items-center w-full px-4 h-auto relative top-0">
        <h1 className="text-4xl mt-7 mb-6 font-bold text-blue-950">
          Quiz Deck
        </h1>

        {currentCard ? (
          <div className="flex flex-col items-center w-[56rem]">
            <div className="bg-slate-50 p-6 rounded-xl shadow-lg mb-6 flex items-center justify-center w-full h-52 max-h-52 overflow-auto relative">
              <p className="absolute top-0 right-0 p-2 text-start align-text-top text-sm text-slate-400 font-medium mr-2 mt-2">
                front
              </p>
              <h3 className="text-xl font-semibold text-center text-blue-950">
                {currentCard.front}
              </h3>
            </div>

            {!showAnswer && (
              <div className="flex flex-col items-center space-y-4 w-full">
                <div className=" bg-white p-6 rounded-xl opacity-0 flex items-center justify-center w-full h-52 max-h-52 overflow-auto relative"></div>
                <button
                  onClick={handleShowAnswer}
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-lg mb-4 font-semibold"
                >
                  Show Answer
                </button>
              </div>
            )}

            {showAnswer && (
              <div className="flex flex-col items-center space-y-4 w-full">
                <div className="bg-blue-200 p-6 rounded-xl shadow-lg flex items-center justify-center w-full h-52 max-h-52 overflow-auto relative">
                  <p className="absolute top-0 right-0 p-2 text-start align-text-top text-sm text-slate-400 font-medium mr-2 mt-2">
                    back
                  </p>
                  <p className="text-xl font-semibold text-center text-gray-700">
                    {currentCard.back}
                  </p>
                </div>

                <div className="flex space-x-4 w-full">
                  <button
                    onClick={() => handleCardResult("Fail")}
                    className="w-full bg-slate-300 hover:bg-slate-400 shadow-sm text-black py-2 rounded-lg font-semibold"
                  >
                    Fail
                  </button>
                  <button
                    onClick={() => handleCardResult("Pass")}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-semibold"
                  >
                    Pass
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-lg font-semibold text-gray-700">
            No cards available to quiz.
          </div>
        )}
      </div>

      {isSidebarOpen && (
        <div className="fixed top-16 right-0 h-full bg-white shadow-lg flex flex-col z-50 transition-all duration-300 w-1/3">
          <div className="p-4 flex justify-between items-center bg-blue-500 text-white h-16">
            <h2 className="text-xl font-semibold">Edit Card</h2>
            <button
              onClick={closeSidebar}
              className="text-white hover:bg-blue-950 rounded-full"
            >
              <XMarkIcon className="h-6 w-6 m-1 text-white" aria-hidden="true" />
            </button>
          </div>
          <div className="p-4">
            <form>
              <div className="mb-4">
                <label
                  htmlFor="front"
                  className="block text-sm font-medium text-gray-700"
                >
                  Front
                </label>
                <textarea
                  id="front"
                  value={selectedCard?.front || ""}
                  onChange={(e) =>
                    setSelectedCard({ ...selectedCard, front: e.target.value })
                  }
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500 p-2.5 resize-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="back"
                  className="block text-sm font-medium text-gray-700"
                >
                  Back
                </label>
                <textarea
                  id="back"
                  value={selectedCard?.back || ""}
                  onChange={(e) =>
                    setSelectedCard({ ...selectedCard, back: e.target.value })
                  }
                  rows="5"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500 p-2.5 resize-none"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  console.log("Save changes", selectedCard);
                  closeSidebar();
                }}
                className="w-full bg-blue-500 hover:bg-blue-950 text-white py-2 rounded-lg mt-2 font-semibold"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
