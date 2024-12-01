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
						<Route path="/addcard" element={<AddCard />} />
						{""}
						<Route path="/deckview" element={<Deckview />} />
						<Route path="/cardlist" element={<Cardlist />} />
						<Route path="/adddeck" element={<AddDeck />} />
						<Route path="/review" element={<Review />} />
						<Route path="/quiz" element={<Quiz />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
