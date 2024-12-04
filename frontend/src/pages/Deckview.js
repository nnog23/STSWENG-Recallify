import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Use Link for navigation
import {
  PlusCircleIcon,
  ShareIcon,
  PencilSquareIcon,
  BookOpenIcon,
  RectangleStackIcon,
  TrashIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";

// Define navigation items and dynamically add 'Add Card' link
export default function Deckview() {
  const { deckId, userId } = useParams(); // Get deckId and userId from the URL params
  const [deckDetails, setDeckDetails] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // Function to fetch deck details
  useEffect(() => {
    const fetchDeckDetails = async () => {
      try {
        const response = await fetch(`https://stsweng-recallify-backend.onrender.com/users/${userId}/decks/${deckId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch deck details");
        }
        const data = await response.json();
        setDeckDetails(data.deck); // Set deck details
      } catch (err) {
        setError(err.message); // Set error message if request fails
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchDeckDetails(); 
  }, [deckId, userId]); 

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }


  const navigation = [
    { name: "Add Card", href: `/users/${userId}/decks/${deckId}/cards`, icon: PlusCircleIcon },
    { name: "Edit Deck", href: `/users/${userId}/decks/${deckId}/edit`, icon: PencilSquareIcon },
    { name: "Card List", href: `/users/${userId}/decks/${deckId}/cards/cardlist`, icon: ViewColumnsIcon },
    { name: "Review", href: `/users/${userId}/decks/${deckId}/cards/reviewcards`, icon: RectangleStackIcon },
    { name: "Practice", href: `/users/${userId}/decks/${deckId}/cards/practicecards`, icon: BookOpenIcon },
    { name: "Delete", href: `/users/${userId}/decks/${deckId}/delete`, icon: TrashIcon },
  ];

  // Utility function for class names
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="flex flex-col items-center min-h-screen space-y-4 mt-10">
      <h1 className="text-5xl mt-7 mb-6 font-bold text-blue-950">
        {deckDetails?.title || "Deck Name"}
      </h1>
      {/* Description */}
      <div className="text-black text-sm text-center h-20 w-9/12">
        {deckDetails?.description || "No description available."}
      </div>

      {/* Navigation Links */}
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href} // Use 'Link' component for navigation
          className={classNames(
            item.current
              ? "bg-gray-900 text-white"
              : "text-black font-semibold hover:bg-blue-950 hover:text-white",
            "rounded-3xl px-4 py-3 text-sm font-medium bg-white shadow-md w-40 flex items-center justify-center"
          )}
        >
          <span className="inline-flex items-center">
            <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
}