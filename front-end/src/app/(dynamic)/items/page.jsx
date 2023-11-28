"use client";

import Image from "next/image";
import { useContext } from "react";
import Link from "next/link";
import { ItemContext } from "@/context/ItemContext";
import { CartContext } from "@/context/CartContext";
import { UserContext } from "@/context/UserContext";

const Items = () => {
	const { allItems, updateItem, removeItem } = useContext(ItemContext);
	const { addToCart, loading } = useContext(CartContext);
	const { user } = useContext(UserContext);
	const itemsLen = allItems.length;

	return (
		<div className="">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-300">
					Customers also purchased
				</h2>

				{loading ? (
					<div className="py-6 text-center text-gray-300">
						Loading...
					</div>
				) : (
					<div
						className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2
								lg:grid-cols-4 xl:gap-x-8"
					>
						{itemsLen > 0 ? (
							allItems.map((product) => (
								<div
									key={product.id}
									className="flex h-fit flex-col"
								>
									<div className="group h-full relative">
										<div
											className="aspect-h-1 aspect-w-1 w-full h-[400px] overflow-hidden
											rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75"
										>
											<img
												src={product.image}
												alt={product.name}
												className="h-full w-full object-cover object-center
												lg:h-full lg:w-full"
											/>
										</div>
										<div className="my-4 flex h-fit justify-between">
											<div className="">
												<h3 className="text-sm text-gray-400">
													<Link
														href={`/items/${product.id}`}
													>
														<span
															aria-hidden="true"
															className="absolute h-4/5 inset-0"
														/>
														{product.name.length >
														11
															? product.name.substring(
																	0,
																	11
															  ) + "..."
															: product.name}
													</Link>
												</h3>
												<p className="mt-1 text-sm text-gray-300">
													{product.color}
												</p>
											</div>
											<div className="text-end relative">
												<p className="text-sm font-medium text-gray-300">
													${product.price}
												</p>
												<p className="flex justify-end">
													<button
														onClick={() =>
															addToCart(product)
														}
														className="absolute top-6 right-0 block"
													>
														<img
															src="/images/icons/add-to-cart.png"
															alt="Add to cart"
															className="h-8 hover:opacity-80"
														/>
													</button>
												</p>
											</div>
										</div>
										{user && user.is_admin && (
											<div className="flex flex-col gap-3">
												<button
													onClick={() =>
														removeItem(product.id)
													}
													className="text-center w-full
												rounded-md border border-transparent bg-indigo-600
												px-6 py-2 text-base font-sm text-white shadow-sm
												hover:bg-indigo-700"
												>
													Remove Item
												</button>
												<Link
													href={`/add_item/${product.id}`}
													className="text-center w-full
												rounded-md border border-transparent bg-indigo-600
												px-6 py-2 text-base font-sm text-white shadow-sm
												hover:bg-indigo-700"
												>
													Update Item
												</Link>
											</div>
										)}
									</div>
								</div>
							))
						) : (
							<div className="py-6 text-center text-gray-300">
								<h3>No products found.</h3>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Items;
