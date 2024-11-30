import {
	HomeIcon,
	UserCircleIcon,
	MagnifyingGlassIcon,
	ShareIcon,
	PencilSquareIcon,
	BookOpenIcon,
	RectangleStackIcon,
} from "@heroicons/react/24/outline";

const navigation = [
	{ name: "Share", href: "#", current: false, icon: ShareIcon },
	{
		name: "Edit",
		href: "#",
		current: false,
		icon: PencilSquareIcon,
	},
	{
		name: "Review",
		href: "#",
		current: false,
		icon: RectangleStackIcon,
	},
	{ name: "Quiz", href: "#", current: false, icon: BookOpenIcon },
];

// Generate a random number between 1 and 10 for repetition
const randomRepeatCount = Math.floor(Math.random() * 8) + 1;

// Generate the repeated "Item" string
const itemText = Array(randomRepeatCount).fill("Item").join(" ");

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Deckview() {
	return (
		<>
			{/* Centered Vertical Navigation */}

			<div className="flex flex-col items-center min-h-screen space-y-4 mt-10">
				<h1 className="text-5xl mt-7 mb-6 font-bold text-blue-950">
					Deck Name
				</h1>
				{/* Description */}
				<div className="text-black text-sm text-center h-20 w-9/12">
					{/*" gdgsssssssssssd"*/}
					{Array.from({ length: Math.floor(Math.random() * 100) + 5 })
						.map(() => "word")
						.join(" ") + "."}
				</div>
				{navigation.map((item) => (
					<a
						key={item.name}
						href={item.href}
						aria-current={item.current ? "page" : undefined}
						className={classNames(
							item.current
								? "bg-gray-900 text-white"
								: "text-black font-semibold hover:bg-blue-950 hover:text-white",
							"rounded-3xl px-4 py-3 text-sm font-medium bg-white shadow-md w-40 flex items-center justify-center"
						)}
					>
						<span className="inline-flex items-center">
							<item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
							{item.name}
						</span>
					</a>
				))}
			</div>
		</>
	);
}
