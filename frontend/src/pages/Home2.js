import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const { userId } = useParams();
  const [decks, setDecks] = useState([]);
  
  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await fetch(`http://localhost:8000/users/${userId}/decks/decklist`);
        if (!response.ok) {
          throw new Error("Failed to fetch decks");
        }
        const data = await response.json();
        
        // Fetch the number of due cards for each deck
        const updatedDecks = await Promise.all(
          data.decks.map(async (deck) => {
            try {
              const dueResponse = await fetch(
                `http://localhost:8000/users/${userId}/decks/${deck._id}/cards/due`
              );
              if (!dueResponse.ok) {
                throw new Error(`Failed to fetch due cards for deck ${deck._id}`);
              }
              const dueData = await dueResponse.json();
              console.log(dueData.numberofcards);
              return { ...deck, dueCards: dueData.numberofcards || 0 };
              
            } catch (error) {
              console.error("Error fetching due cards:", error);
              return { ...deck, dueCards: 0 }; // Default to 0 if fetching fails
            }
          })
        );

        setDecks(updatedDecks);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    fetchDecks();
  }, [userId]);


  return (
    <>
      <div className="flex flex-col items-center mt-12 min-h-screen">
        {/* Add Button */}
        <Link
          to={`/users/${userId}/decks/adddeck`}
          className="absolute right-48 top-24 text-gray-700 hover:bg-blue-950 hover:text-white rounded-3xl px-3 py-2 text-sm font-medium bg-white shadow-md flex items-center justify-center"
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          Add Deck
        </Link>

        <h1 className="text-4xl mt-7 mb-6 font-bold text-blue-950">Decks</h1>

        <div className="w-9/12 grid grid-cols-4 gap-x-5 gap-y-5">
          {decks.length === 0 ? (
            <div>No decks available</div>
          ) : (
            decks.map((deck) => (
              <Link
                key={deck._id}
                to={`/users/${userId}/decks/${deck._id}`}
                className="relative bg-blue-500 p-4 rounded-2xl shadow-md grid grid-rows-subgrid row-span-4 border-8 border-blue-200 hover:scale-105 transition-transform"
              >
                {/* Overlapping Bubble Badge */}
                <div className="absolute -top-3 -right-3 bg-orange-500 hover:bg-orange-600 text-white text-s font-bold py-1 px-2 rounded-full shadow-lg">
                  {deck.dueCards}
                </div>

                {/* Blue Box */}
                <div className="bg-white p-2 rounded-lg overflow-hidden">
                  <img
                    src={deck.imageUrl || "https://via.placeholder.com/150"}
                    alt="Deck Thumbnail"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>

                {/* Name */}
                <div className="text-white text-xl font-semibold text-center">
                  {deck.title}
                </div>

                {/* Description */}
                <div className="text-white text-sm text-center">
                  {deck.description || "No description available."}
                </div>

                {/* Date */}
                <div className="text-white text-xs text-center mt-auto">
                  {new Date(deck.dateCreated).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="h-60 flex flex-col items-center justify-center pt-10">
        <div className="w-10/12 bg-yellow-400 h-40 rounded-tr-3xl rounded-tl-3xl flex items-center justify-center">
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
}
