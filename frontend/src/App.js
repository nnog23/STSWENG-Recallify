import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages and components

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Browse from "./pages/Browse";
import Deckview from "./pages/Deckview";
import AddCard from "./pages/AddCard";
import DeleteDeck from "./pages/DeleteDeck";
import AddDeck from "./pages/AddDeck";
import Cardlist from "./pages/Cardlist";
import Review from "./pages/Review";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Profile2 from "./pages/Profile2";
import Home2 from "./pages/Home2";
import EditDeck from "./pages/EditDeck";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<div className="pages">
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/login" element={<Login />} />
						<Route path="/home" element={<Login />} />
						<Route path="/browse" element={<Browse />} />
						<Route
							path="/users/:userId/decks/:deckId/cards"
							element={<AddCard />}
						/>
						<Route path="/users/:userId/decks/:deckId" element={<Deckview />} />
						<Route
							path="/users/:userId/decks/:deckId/cards/cardlist"
							element={<Cardlist />}
						/>
						<Route path="/users/:userId/decks/adddeck" element={<AddDeck />} />
						<Route
							path="/users/:userId/decks/:deckId/cards/reviewcards"
							element={<Review />}
						/>
						<Route
							path="/users/:userId/decks/:deckId/cards/quizcards"
							element={<Quiz />}
						/>
						<Route path="/users/:userId/profile" element={<Profile2 />} />
						<Route path="/users/:userId/decks/decklist" element={<Home2 />} />
						<Route
							path="/users/:userId/decks/:deckId/delete"
							element={<DeleteDeck />}
						/>
						<Route
							path="/users/:userId/decks/:deckId/edit"
							element={<EditDeck />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
