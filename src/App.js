import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import DisplayDeckFlashcards from "./pages/DisplayDeckFlashcards";
import CreateFlashcard from "./pages/CreateFlashcard";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/profile",
		element: <Profile />,
	},
	{
		path: "/decklist",
		element: <DisplayDeckFlashcards />,
	},
]);

function App() {
	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
