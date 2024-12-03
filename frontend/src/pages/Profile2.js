import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { XMarkIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

export default function Profile() {
	const [user, setUser] = useState(null); // For storing user profile data
	const [decks, setDecks] = useState([]); // For storing user's decks
	const [username, setUsername] = useState(null);
	const [profilePicture, setProfilePicture] = useState(null);
	const [bio, setBio] = useState(null);
	const token = localStorage.getItem("authToken");
	const { userId } = useParams();

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		// Fetch user profile data
		const fetchUserProfile = async () => {
			try {
				const response = await fetch(
					`http://localhost:8000/users/${userId}/profile`,
					{
						headers: {
							Authorization: `Bearer ${token}`, // Replace with your JWT token
						},
					}
				);
				const data = await response.json();

				setUsername(data.username);
				setProfilePicture(data.profilePicture);
				setBio(data.bio);
			} catch (error) {
				console.error("Error fetching user profile:", error);
			}
		};

		// Fetch user's decks data
		const fetchUserDecks = async () => {
			try {
				const response = await fetch(
					`http://localhost:8000/users/${userId}/decks/decklist`
				);
				const data = await response.json();
				setDecks(data.decks); // Set decks data to state
			} catch (error) {
				console.error("Error fetching user decks:", error);
			}
		};

		fetchUserProfile();
		fetchUserDecks();
	}, [userId]);

	const handleEdit = (bio) => {
		if (isSidebarOpen) {
			setIsSidebarOpen(false); // If sidebar is open, close it
		} else {
			setBio(bio); // Update bio if sidebar is opening
			setIsSidebarOpen(true); // Otherwise, open it
		}
	};

	const closeSidebar = () => {
		setIsSidebarOpen(false);
		setBio(bio);
	};

	// insert handle submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			console.log("hey!");
			// insert
		} catch (err) {
			console.error("Error updating card:", err);
		}
	};

	return (
		<div className="flex items-end justify-end mb-10">
			<div
				className={` transition-all duration-300 ${
					isSidebarOpen ? "w-2/3" : "w-full"
				}`}
			>
				<div className="flex justify-center">
					<div className="h-auto flex justify-between  px-6 pl-14 gap-10 py-8 space-x-6 bg-white rounded-xl shadow-md w-11/12 md:w-9/12 ">
						{/* Profile Section */}
						<div id="profile-card" className="w-2/4 max-w-m  overflow-hidden">
							{/* Picture */}
							<div className="w-1/2 flex justify-center items-center relative">
								<img
									id="profile-picture"
									className="rounded-full w-40 h-40 object-cover"
									src={profilePicture || "https://via.placeholder.com/150"}
									alt="Profile Picture"
								/>
								{/* Edit button for picture */}
								<button className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg">
									Edit
								</button>
							</div>
							{/* Content */}
							<div className="p-4">
								{/* Name */}
								<h2
									id="profile-name"
									className="text-xl font-semibold text-gray-800"
								>
									{username || "John Doe"}
								</h2>
								{/* Bio */}
								<p
									id="profile-bio"
									className="text-gray-600 mt-2 break-words overflow-hidden"
								>
									{bio || "Hi! This is my bio."}
								</p>
								{/* Edit button for bio */}
								<button
									onClick={() => handleEdit(bio)}
									className="mt-2 text-blue-500 font-semibold"
								>
									Edit Bio
								</button>
							</div>
						</div>

						{/* Heatmap */}
						<div className="w-1/2 bg-yellow-200 rounded-tr-3xl rounded-3xl flex items-center justify-center">
							<p className="text-white text-3xl font-bold text-center">
								Heat Map
							</p>
						</div>
					</div>
				</div>
				{/* Decks Section */}
				<div className="flex flex-col items-center mt-14 smin-h-screen">
					{/* Add Button */}
					<Link
						to={`/users/${userId}/decks/adddeck`}
						className="absolute right-48 top-100 text-gray-700 hover:bg-blue-950 hover:text-white rounded-3xl px-3 py-2 text-sm font-medium bg-white shadow-md flex items-center justify-center"
					>
						<PlusCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
						Add Deck
					</Link>

					<h1 className="text-4xl mt-7 mb-6 font-bold text-blue-950">Decks</h1>

					<div className="w-9/12 grid grid-cols-4 gap-x-5 gap-y-5">
						{decks.length === 0 ? (
							<div>No decks available</div>
						) : (
							decks.map((deck, index) => (
								<Link
									key={deck._id}
									to={`/users/${userId}/decks/${deck._id}`}
									className="relative bg-blue-500 p-4 rounded-2xl shadow-md grid grid-rows-subgrid row-span-4 border-8 border-blue-200 hover:scale-105 transition-transform"
								>
									{/* Overlapping Bubble Badge */}
									<div className="absolute -top-3 -right-3 bg-yellow-300 text-white text-s font-bold py-1 px-2 rounded-full shadow-lg">
										{index + 1}
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

				{/* Sidebar */}
				<div
					className={`fixed top-16 left-0 h-full bg-white shadow-lg flex flex-col z-50 transition-all duration-300 ${
						isSidebarOpen ? "w-1/3" : "w-0"
					}`}
				>
					{isSidebarOpen && (
						<>
							<div className="p-4 flex justify-between items-center bg-blue-500 text-white h-16">
								<h2 className="text-xl font-semibold">Edit Bio</h2>
								<button
									onClick={closeSidebar}
									className="text-white hover:bg-blue-950 rounded-full"
								>
									<XMarkIcon className="h-5 w-5" aria-hidden="true" />
								</button>
							</div>

							<form className="p-6" onSubmit={handleSubmit}>
								<div className="mb-4">
									<label className="ml-1 block text-gray-700">Bio</label>
									<textarea
										rows="4"
										value={bio}
										// onChange={(e) => })}
										className="w-full p-2 border rounded-lg"
										placeholder={bio || "Edit your bio..."}
									></textarea>
								</div>

								<div className="flex justify-end">
									<button
										type="submit"
										className="px-4 py-2 bg-blue-500 text-white rounded-lg"
									>
										Save Changes
									</button>
								</div>
							</form>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
