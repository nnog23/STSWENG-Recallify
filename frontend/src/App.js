import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages and components

import Home from "./pages/Home";
import Test from "./pages/Test";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<div className="pages">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/profile" element={<Profile />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
