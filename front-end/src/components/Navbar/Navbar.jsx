"use client";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useContext } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { links, linksProfile, adminLinks } from "../../data";
import Button from "../Button/Button";
import { UserContext } from "@/context/UserContext";
import { CartContext } from "@/context/CartContext";

const Navbar = () => {
	const { user, logout } = useContext(UserContext);
	const { toggleOpen } = useContext(CartContext);

	return (
		<Disclosure
			as="nav"
			className="bg-gray-800 z-40 sticky top-0 left-0 w-full"
		>
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button
									className="relative inline-flex items-center
												justify-center rounded-md p-2
												text-gray-400 hover:bg-gray-700
												hover:text-white focus:outline-none
												focus:ring-2 focus:ring-inset
												focus:ring-white"
								>
									<span className="absolute -inset-0.5" />
									<span className="sr-only">
										Open main menu
									</span>
									{open ? (
										<XMarkIcon
											className="block h-6 w-6"
											aria-hidden="true"
										/>
									) : (
										<Bars3Icon
											className="block h-6 w-6"
											aria-hidden="true"
										/>
									)}
								</Disclosure.Button>
							</div>
							<div
								className="flex flex-1 items-center justify-center
											sm:items-stretch sm:justify-start"
							>
								<div className="flex-shrink-0 items-center hidden sm:flex">
									<Link href={"/"}>
										<Image
											width={150}
											height={150}
											src="/images/logo2.png"
											alt="Your Company"
										/>
									</Link>
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex">
										{links.map((link) => (
											<Link
												key={link.id}
												href={link.url}
												className="text-gray-300 hover:bg-gray-700 hover:text-white
															rounded-md px-3 py-2 text-sm font-medium"
											>
												{link.title}
											</Link>
										))}
									</div>
								</div>
							</div>
							<div
								className="absolute inset-y-0 right-0 flex
											items-center pr-2 sm:static sm:inset-auto
											sm:ml-6 sm:pr-0"
							>
								{/* Profile dropdown */}
								<Button
									class="text-sm text-gray-100 hover:text-gray-300
												focus:outline-none"
									func={toggleOpen}
									name={"Cart"}
								/>
								<Menu as="div" className="relative ml-3">
									<div>
										<Menu.Button
											className="relative flex rounded-full bg-gray-800 text-sm
																focus:outline-none focus:ring-2 focus:ring-white
																focus:ring-offset-2 focus:ring-offset-gray-800"
										>
											<span className="absolute -inset-1.5" />
											<span className="sr-only">
												Open user menu
											</span>
											<Image
												width={35}
												height={35}
												className="rounded-full"
												src="/images/profiles/user_default.png"
												alt=""
											/>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items
											className="absolute right-0 z-10 mt-2 w-48 origin-top-right
																rounded-md bg-white py-1 shadow-lg ring-1
																ring-black ring-opacity-5 focus:outline-none"
										>
											{user ? (
												<>
													{linksProfile.map(
														(link) => (
															<Menu.Item
																key={link.id}
															>
																<Link
																	href={
																		link.url
																	}
																	className="block px-4 py-2 text-sm text-gray-700
																				hover:bg-gray-200"
																>
																	{link.title}
																</Link>
															</Menu.Item>
														)
													)}
													{user.is_admin ? (
														<>
															{adminLinks.map(
																(link) => (
																	<Menu.Item
																		key={
																			link.id
																		}
																	>
																		<Link
																			href={
																				link.url
																			}
																			className="block px-4 py-2 text-sm
																					text-gray-700 hover:bg-gray-200"
																		>
																			{
																				link.title
																			}
																		</Link>
																	</Menu.Item>
																)
															)}
														</>
													) : (
														""
													)}
													<Menu.Item>
														<Button
															func={logout}
															name={"Sign Out"}
															class={
																"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-start"
															}
														/>
													</Menu.Item>
												</>
											) : (
												<>
													<Menu.Item>
														<Link
															href={"/login"}
															className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
														>
															Login
														</Link>
													</Menu.Item>
													<Menu.Item>
														<Link
															href={"/signup"}
															className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
														>
															Sign Up
														</Link>
													</Menu.Item>
												</>
											)}
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="flex flex-shrink-0 justify-center items-center">
							<Link href={"/"}>
								<Image
									width={150}
									height={150}
									src="/images/logo2.png"
									alt="Your Company"
								/>
							</Link>
						</div>
						<div className="space-y-1 px-2 pb-3 pt-2">
							{links.map((link) => (
								<Link
									key={link.id}
									href={link.url}
									className="text-gray-300 hover:bg-gray-700 hover:text-white
												block rounded-md px-3 py-2 text-base font-medium"
								>
									<Disclosure.Button>
										{link.title}
									</Disclosure.Button>
								</Link>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default Navbar;
