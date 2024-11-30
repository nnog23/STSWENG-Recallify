import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages and components

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Browse from "./pages/Browse";
import Deckview from "./pages/Deckview";
import AddCard from "./pages/AddCard";
import AddDeck from "./pages/AddDeck";


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
						<Route path="/deckview" element={<Deckview />} />
						<Route path="/addcard" element={<AddCard />} />
            <Route path="/adddeck" element={<AddDeck />} />

					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
