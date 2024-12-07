import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Use Link for navigation
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
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
	const { deckId } = useParams(); // Get deckId and userId from the URL params
	const [deckDetails, setDeckDetails] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const [userId, setUserId] = useState(null);

	// Function to fetch deck details
	useEffect(() => {
		const fetchDeckDetails = async () => {
			try {
				const response = await fetch(`https://stsweng-recallify-backend.onrender.com/decks/${deckId}`);
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

		const token = localStorage.getItem("authToken"); // Get the token from localStorage (or any other source)

		if (token) {
			try {
				const decodedToken = jwtDecode(token); // Decode the token
				setUserId(decodedToken.userId); // Extract userId from decoded token
				console.log(userId);
			} catch (error) {
				console.error("Error decoding token:", error);
			}
		}

		fetchDeckDetails();
	}, [deckId]);

	if (loading) {
		return <div className="text-center mt-10">Loading...</div>;
	}

	if (error) {
		return <div className="text-center mt-10 text-red-500">{error}</div>;
	}

	// Utility function for class names
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	// Function to duplicate the deck
	const duplicateDeck = async () => {
		console.log("clicked!");
		try {
			const response = await fetch(
				`https://stsweng-recallify-backend.onrender.com/users/${userId}/decks/${deckId}/duplicate`,
				{
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			const data = await response.json();
			
			if (response.status === 200) {
				alert("Deck duplicated successfully!");
				// Redirect to the new deck's edit page with the new deckId
				navigate(
					`/users/${data.deck.userId}/decks/${data.deck._id}/editdeck`
				);
			} else {
				alert("Failed to duplicate deck: " + (data.error || data.details));
			}
		} catch (err) {
			console.error(err);
			alert("An error occurred while duplicating the deck.");
		}
	};

	const navigation = [
		{
			name: "Card List",
			href: `decks/${deckId}/cards/cardlist`,
			icon: ViewColumnsIcon,
		},

		{
			name: "Practice",
			href: `decks/${deckId}/cards/practicecards`,
			icon: BookOpenIcon,
		},
	];

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
			{/* Optionally render a duplicate button below */}
			<button
				onClick={duplicateDeck}
				className="text-black  hover:bg-blue-950 hover:text-white rounded-3xl px-4 py-3 text-sm font-medium bg-white shadow-md w-40 flex items-center justify-center "
			>
				<span className="inline-flex items-center">
					<RectangleStackIcon className="h-5 w-5 mr-2" aria-hidden="true" />
					Duplicate Deck
				</span>
			</button>
		</div>
	);
}
