import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/react";
import {
	Bars3Icon,
	BellIcon,
	XMarkIcon,
	HomeIcon,
	UserCircleIcon,
	MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

// Navigation items
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const [userId, setUserId] = useState(null);
	const [username, setUsername] = useState(null);
	const [tokenExists, setTokenExists] = useState(false);
	const [navigation, setNavigation] = useState([]);

	useEffect(() => {
		const handleTokenChange = () => {
			const token = localStorage.getItem("authToken");
			if (token) {
				try {
					const decodedToken = jwtDecode(token);
					setUserId(decodedToken.userId); // Assuming the token contains userId
					setUsername(decodedToken.username); // Assuming the token contains username
					setTokenExists(true); // Update state when token exists

					// Dynamically update navigation
					setNavigation([
						{
							name: "Home",
							href: `/users/${decodedToken.userId}/decks/decklist`,
							current: false,
							icon: HomeIcon,
						},
						{
							name: "Browse",
							href: `/browse/${decodedToken.userId}`,
							current: false,
							icon: MagnifyingGlassIcon,
						},
						{
							name: "Profile",
							href: `/users/${decodedToken.userId}/profile`,
							current: false,
							icon: UserCircleIcon,
						},
					]);
				} catch (error) {
					console.error("Error decoding token:", error);
				}
			} else {
				setTokenExists(false); // Update state if token doesn't exist
				setUserId(null);
				setUsername(null);
				setNavigation([]); // Clear navigation when no token is found
			}
		};

		// Initial load - check the token
		handleTokenChange();

		// Listen for changes to localStorage (token change)
		window.addEventListener("storage", handleTokenChange);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener("storage", handleTokenChange);
		};
	}, []); // Empty dependency array means this effect runs once when the component mounts

	const handleSignOut = () => {
		// Remove the auth token from localStorage
		localStorage.removeItem("authToken");
		// Reset token state
		setUserId(null);
		setUsername(null);
		setTokenExists(false); // Update tokenExists when logging out
		setNavigation([]); // Clear navigation on sign-out
	};

	return (
		<Disclosure as="nav" className="bg-white shadow-md sticky top-0 z-50">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					{/* Mobile menu button */}
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
							<span className="sr-only">Open main menu</span>
							<Bars3Icon
								aria-hidden="true"
								className="block size-6 group-data-[open]:hidden"
							/>
							<XMarkIcon
								aria-hidden="true"
								className="hidden size-6 group-data-[open]:block"
							/>
						</DisclosureButton>
					</div>

					{/* Logo */}
					<div className="flex w-[76px] items-center justify-start">
						<div className="flex shrink-0 items-center">
							<img
								alt="Recallify"
								src="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e5d0c2ab246786ca1d5e_86.png"
								className="h-8 w-auto"
							/>
							<span className="ml-3 text-blue-700 font-bold text-lg hidden sm:block">
								Recallify
							</span>
						</div>
					</div>

					{/* Centered Navigation */}
					<div className="hidden sm:flex sm:flex-1 sm:justify-center">
						<div className="flex space-x-10">
							{tokenExists &&
								navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										aria-current={item.current ? "page" : undefined}
										className={classNames(
											item.current
												? "bg-gray-900 text-white"
												: "text-black font-semibold hover:bg-blue-950 hover:text-white",
											"rounded-3xl px-3 py-2 text-sm font-medium bg-white shadow-md"
										)}
									>
										<span className="inline-flex items-center py-0 pr-2">
											<item.icon className="h-5 w-5 mr-3" aria-hidden="true" />
											{item.name}
										</span>
									</a>
								))}
						</div>
					</div>

					{/* Notifications and Profile Dropdown */}
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
						<button
							type="button"
							className="relative rounded-full p-1 text-black hover:text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
						>
							<span className="sr-only">View notifications</span>
							<BellIcon aria-hidden="true" className="size-6" />
						</button>

						{/* Profile dropdown with user name */}
						<Menu as="div" className="relative ml-3 flex items-center">
							<MenuButton className="relative flex items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ">
								<span className="mr-3 text-black font-semibold text-md hidden sm:block">
									{username ? username : ""}
								</span>
								<img
									alt="User Profile"
									src="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e9ea16121c4a0759ffbb_53.png"
									className="h-8 w-8 rounded-full"
								/>
							</MenuButton>
							<MenuItems
								transition
								className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
								style={{ top: "100%" }}
							>
								<MenuItem>
									<a
										href="#"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										Settings
									</a>
								</MenuItem>
								<MenuItem>
									<a
										href="/login"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										onClick={handleSignOut} // Call the sign-out handler
									>
										Sign out
									</a>
								</MenuItem>
							</MenuItems>
						</Menu>
					</div>
				</div>
			</div>

			<DisclosurePanel className="sm:hidden">
				<div className="space-y-1 px-2 pb-3 pt-2">
					{tokenExists &&
						navigation.map((item) => (
							<DisclosureButton
								key={item.name}
								as="a"
								href={item.href}
								aria-current={item.current ? "page" : undefined}
								className={classNames(
									item.current
										? "bg-gray-900 text-white"
										: "text-gray-300 hover:bg-gray-700 hover:text-white",
									"block rounded-md px-3 py-2 text-base font-medium"
								)}
							>
								{item.name}
							</DisclosureButton>
						))}
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
}
