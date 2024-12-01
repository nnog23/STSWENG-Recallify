import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages and components

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Browse from "./pages/Browse";
import Deckview from "./pages/Deckview";
import AddCard from "./pages/AddCard";
import AddDeck from "./pages/AddDeck";
import Cardlist from "./pages/Cardlist";
import Review from "./pages/Review";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import Home2 from "./pages/Home2";
function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<div className="pages">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route path="/browse" element={<Browse />} />
						<Route path="/users/:userId/decks/:deckId/cards" element={<AddCard />} />
						{""}
						<Route path="/users/:userId/decks/:deckId" element={<Deckview />} />
						<Route path="/users/:userId/decks/:deckId/cards/cardlist" element={<Cardlist />} />
						<Route path="/users/:userId/decks/adddeck" element={<AddDeck />} />
						<Route path="/review" element={<Review />} />
						<Route path="/quiz" element={<Quiz />} />
						<Route path="/login" element={<Login/>} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/users/:userId/decks/decklist" element={<Home2 />} />

					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
