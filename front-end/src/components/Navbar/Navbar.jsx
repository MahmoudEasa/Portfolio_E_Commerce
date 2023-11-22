"use client";

import Link from "next/link";
import { links } from "./data";

const Navbar = () => {
	return (
		<header className="js-enabled">
			<nav className="bg-gray-800 js-enabled">
				<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
							{/* <!-- Mobile menu button--> */}
							<button
								type="button"
								className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
								aria-controls="mobile-menu"
								aria-expanded="false"
							>
								<span className="absolute -inset-0.5"></span>
								<span className="sr-only">Open main menu</span>
								<svg
									className="block h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</svg>
								<svg
									className="hidden h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
						<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
							<div className="flex flex-shrink-0 items-center">
								<Link href={"/"}>
									<img
										className="h-8 w-auto"
										src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
										alt="Your Company"
									/>
								</Link>
							</div>
							<div className="hidden sm:ml-6 sm:block">
								<div className="flex space-x-4">
									{/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
									{links.map((link) => (
										<Link
											key={link.id}
											href={link.url}
											className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
											aria-current="page"
										>
											{link.title}
										</Link>
									))}
									<button
										onClick={(e) =>
											console.log("Loged out")
										}
										className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
									>
										Log out
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* <!-- Mobile menu, show/hide based on menu state. --> */}
				<div className="sm:hidden" id="mobile-menu">
					<div className="space-y-1 px-2 pb-3 pt-2">
						{/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
						{links.map((link) => (
							<Link
								key={link.id}
								href={link.url}
								className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
								aria-current="page"
							>
								{link.title}
							</Link>
						))}
						<button
							onClick={(e) => console.log("Loged out")}
							className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
						>
							Log out
						</button>
					</div>
				</div>
			</nav>
		</header>
		// 		<nav
		// 			classNameName="flex justify-between items-center
		// 						p-5 sticky top-0 z-50 bg-gray-800
		// 						w-full h-14 mb-5"
		// 		>
		// 			<h1 classNameName="font-black">E-Shop</h1>
		// 			<ul classNameName="flex justify-between gap-5">
		// 				<li>Home</li>
		// 				<li>Cart</li>
		// 				<li>Your Account</li>
		// 				<li>Your Orders</li>
		// 				<li>About</li>
		// 				<li>Contact</li>
		// 				<li>Blog</li>
		// 			</ul>
		// 		</nav>
	);
};

export default Navbar;
