import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages and components

import Home from "./pages/Home";
import Test from "./pages/Test";
import Navbar from "./components/Navbar";
import AddCard from "./pages/AddCard";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<div className="pages">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route path="/addcard" element={<AddCard />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
