"use client";

import Image from "next/image";
import { Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";

const Cart = () => {
	const { cart, open, removeFromCart, checkout, toggleOpen, loading } =
		useContext(CartContext);
	let cartLen = 0;
	let subTotal = 0;

	if (cart) cartLen = cart.length;

	if (cartLen > 0) cart.map((c) => (subTotal += c.item.price));

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={toggleOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
									<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
										<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
											<div className="flex items-start justify-between">
												<Dialog.Title className="text-lg font-medium text-gray-900">
													Shopping cart
												</Dialog.Title>
												<div className="ml-3 flex h-7 items-center">
													<button
														type="button"
														className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
														onClick={() =>
															toggleOpen()
														}
													>
														<span className="absolute -inset-0.5" />
														<span className="sr-only">
															Close panel
														</span>
														<XMarkIcon
															className="h-6 w-6"
															aria-hidden="true"
														/>
													</button>
												</div>
											</div>

											<div className="mt-8">
												{loading ? (
													<div className="flow-root py-6 text-center text-gray-900">
														Loading...
													</div>
												) : (
													<div className="flow-root">
														<ul
															role="list"
															className="-my-6 divide-y divide-gray-200"
														>
															{cartLen > 0 ? (
																cart.map(
																	(
																		product
																	) => (
																		<li
																			key={
																				product.cart_id
																			}
																			className="flex py-6"
																		>
																			<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
																				<img
																					src={
																						product
																							.item
																							.image
																					}
																					alt={
																						product
																							.item
																							.name
																					}
																					className="h-full w-full object-cover object-center"
																				/>
																			</div>

																			<div className="ml-4 flex flex-1 flex-col">
																				<div>
																					<div className="flex justify-between text-base font-medium text-gray-900">
																						<h3>
																							<Link
																								href={`/items/${product.item.id}`}
																							>
																								{
																									product
																										.item
																										.name
																								}
																							</Link>
																						</h3>
																						<p className="ml-4">
																							$
																							{
																								product
																									.item
																									.price
																							}
																						</p>
																					</div>
																					<p className="mt-1 text-sm text-gray-500">
																						{
																							product
																								.item
																								.color
																						}
																					</p>
																				</div>
																				<div className="flex flex-1 items-end justify-between text-sm">
																					<p className="text-gray-500">
																						Qty
																						{
																							" 1 "
																						}
																						{}
																					</p>

																					<div className="flex">
																						<button
																							onClick={() =>
																								removeFromCart(
																									product
																										.item
																										.id,
																									product.cart_id
																								)
																							}
																							type="button"
																							className="font-medium text-indigo-600 hover:text-indigo-500"
																						>
																							Remove
																						</button>
																					</div>
																				</div>
																			</div>
																		</li>
																	)
																)
															) : (
																<li className="py-6 text-center text-gray-900">
																	<h3>
																		Your
																		cart is
																		empty
																	</h3>
																</li>
															)}
														</ul>
													</div>
												)}
											</div>
										</div>

										<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
											<div className="flex justify-between text-base font-medium text-gray-900">
												<p>Subtotal</p>
												<p>${subTotal}</p>
											</div>
											<p className="mt-0.5 text-sm text-gray-500">
												Shipping and taxes calculated at
												checkout.
											</p>
											<div className="mt-6">
												<button
													onClick={() =>
														checkout(cart)
													}
													className="block text-center w-full rounded-md border
																border-transparent bg-indigo-600 px-6
																py-3 text-base font-medium text-white
																shadow-sm hover:bg-indigo-700"
												>
													Checkout
												</button>
											</div>
											<div className="mt-6 flex justify-center gap-5 text-center text-sm text-gray-500">
												<p>or</p>
												<button
													type="button"
													className="font-medium text-indigo-600 hover:text-indigo-500"
													onClick={() => toggleOpen()}
												>
													Continue Shopping
													<span aria-hidden="true">
														{" "}
														&rarr;
													</span>
												</button>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default Cart;
