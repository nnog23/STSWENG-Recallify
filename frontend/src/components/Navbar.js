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

const navigation = [
	{ name: "Home", href: "/home", current: false, icon: HomeIcon },
	{
		name: "Browse",
		href: "/browse",
		current: false,
		icon: MagnifyingGlassIcon,
	},
	{ name: "Profile", href: "/profile", current: false, icon: UserCircleIcon },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	return (
		<Disclosure as="nav" className="bg-white shadow-md sticky top-0 z-50">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					{/* Mobile menu button */} {/*test*/}
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
							<span className="absolute -inset-0.5" />
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
							{navigation.map((item) => (
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
							<span className="absolute -inset-1.5" />
							<span className="sr-only">View notifications</span>
							<BellIcon aria-hidden="true" className="size-6" />
						</button>

						{/* Profile dropdown with user name */}
						<Menu as="div" className="relative ml-3 flex items-center">
							<MenuButton className="relative flex items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ">
								<span className="mr-3 text-black font-semibold text-md hidden sm:block">
									John Doe
								</span>
								<img
									alt=""
									src="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e9ea16121c4a0759ffbb_53.png"
									className="h-8 w-8 rounded-full"
								/>
							</MenuButton>
							<MenuItems
								transition
								className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
								style={{ top: "100%" }}
							>
								<MenuItem>
									<a
										href="#"
										className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
									>
										Settings
									</a>
								</MenuItem>
								<MenuItem>
									<a
										href="#"
										className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
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
					{navigation.map((item) => (
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
