import React, { useState, useEffect } from "react";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useParams, useNavigate } from "react-router-dom";

const Review = () => {
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
        const response = await fetch(`https://stsweng-recallify-backend.onrender.com/users/${userId}/decks/${deckId}/cards/reviewcards`);
        const data = await response.json();

        if (response.status === 200) {
			const today = new Date().toISOString().split("T")[0];  // Get today's date in YYYY-MM-DD format

			const filteredCards = data.cards.filter((card) => {
			  if (!card.nextReviewDate) return true;  // If there's no nextReviewDate, include the card
			
			  const cardReviewDate = card.nextReviewDate.split("T")[0];  // Extract the date part only (YYYY-MM-DD)
			
			  return cardReviewDate <= today;  // Include the card if the review date is today or earlier

			});
          setCards(filteredCards);
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

  const handleCardResult = async (result) => {
    const rating = result === "Pass" ? 1 : 0;
    const currentCard = cards[currentCardIndex];
  
    try {
      const response = await fetch(
        `https://stsweng-recallify-backend.onrender.com/users/${userId}/decks/${deckId}/cards/${currentCard._id}/review`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating }),
        }
      );
  
      if (response.status === 200) {
        console.log("Card reviewed successfully.");
  
        setCards((prevCards) => {
          const updatedCards = [...prevCards];
          if (result === "Pass") {
            // Remove the card if it is a Pass
            updatedCards.splice(currentCardIndex, 1);
          } else {
            // Move the failed card to the back of the array
            const failedCard = updatedCards.splice(currentCardIndex, 1)[0];
            updatedCards.push(failedCard);
          }
          return updatedCards;
        });
  
        // Adjust currentCardIndex to stay within bounds
        setCurrentCardIndex((prevIndex) =>
          result === "Pass"
            ? Math.min(prevIndex, cards.length - 2) // Adjust index after removal
            : Math.min(prevIndex, cards.length - 1) // Ensure it's within bounds
        );
      } else {
        console.error("Failed to update card review.");
      }
    } catch (err) {
      console.error("Error updating card review:", err);
    }
  
    setShowAnswer(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCard) return;

    const { front, back } = selectedCard;
	const cardId = selectedCard._id;
    try {
      const response = await fetch(
        `https://stsweng-recallify-backend.onrender.com/users/${userId}/decks/${deckId}/cards/${cardId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            front,
            back,
          }),
        }
      );
	  
      const data = await response.json();

      if (response.status === 200) {
     
        setCards((prevCards) =>
          prevCards.map((card) =>
            card._id === selectedCard._id
              ? { ...card, front, back }
              : card
          )
        );
        closeSidebar();
      } else {
        console.error("Failed to update card:", data.error || data.details);
      }
    } catch (err) {
      console.error("Error updating card:", err);
    }
	
  };

  const currentCard = cards[currentCardIndex];

  const handleBackClick = () => {
    navigate(`/users/${userId}/decks/${deckId}`); // Adjust this path to your deck view route
  };

  return (
    <div className="h-[91vh]">
		            {/* Back Button at the top-left */}
					<div className="absolute top-100 left-50 z-50 m-6 ">
        <button
          onClick={handleBackClick}
          className="bg-blue-500 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Back to Deck
        </button>
      </div>
	
      <div className="flex flex-col items-center w-full px-4 h-auto relative top-0">

		
        <h1 className="text-4xl mt-7 mb-6 font-bold text-blue-950">
          Review Deck
        </h1>

        <button
          onClick={() => handleEdit(currentCard)}
          className="absolute right-12 top-6 text-gray-700 hover:bg-blue-950 hover:text-white rounded-3xl px-3 py-2 text-sm font-medium bg-white shadow-md flex items-center justify-center"
        >
          <PencilSquareIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          Edit
        </button>

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
            No cards available to review.
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
            <form className = "p-6" onSubmit={handleSubmit}>
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
				type="submit"
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

export default Review;
