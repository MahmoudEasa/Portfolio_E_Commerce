"use client";

import Image from "next/image";
import { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OrderContext } from "@/context/OrderContext";

const Orders = () => {
	const { orders, removeOrder, loading } = useContext(OrderContext);
	const router = useRouter();
	let cartLen = orders.length;
	let subTotal = 0;
	const user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		if (!user) router.push("/");
	}, [user, router]);

	if (cartLen > 0) orders.map((c) => (subTotal += c.item.price));

	return (
		<div className="flex w-full min-h-min mt-5 flex-col justify-between bg-black shadow-xl">
			<div className="flex-1 h-full px-4 py-6 sm:px-6">
				<div className="text-lg font-medium text-gray-300">
					Your Orders
				</div>

				<div className="mt-8">
					{loading ? (
						<div
							className="h-full flex items-center justify-center
										py-6 text-center text-gray-400"
						>
							Loading...
						</div>
					) : (
						<div className="flow-root h-full">
							<ul
								role="list"
								className="-my-6 divide-y divide-gray-200"
							>
								{cartLen > 0 ? (
									orders.map((order) => (
										<li
											key={order.cart_id}
											className="flex py-6"
										>
											<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
												<Image
													width={100}
													height={100}
													src={order.item.image}
													alt={order.item.name}
													className="h-full w-full object-cover object-center"
												/>
											</div>

											<div className="ml-4 flex flex-1 flex-col">
												<div>
													<div className="flex justify-between text-base font-medium text-gray-300">
														<h3>
															<Link
																href={`/items/${order.item.id}`}
															>
																{
																	order.item
																		.name
																}
															</Link>
														</h3>
														<p className="ml-4">
															${order.item.price}
														</p>
													</div>
													<p className="mt-1 text-sm text-gray-400">
														{order.item.color}
													</p>
												</div>
												<div className="flex flex-1 items-end justify-between text-sm">
													<p className="text-gray-400">
														Qty
														{" 1 "}
														{}
													</p>

													<div className="flex">
														<button
															onClick={() =>
																removeOrder(
																	order.order_id
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
									))
								) : (
									<li
										className="text-center flex flex-col gap-10
													text-gray-400 mt-10"
									>
										<h3>
											You haven't made any orders yet.
										</h3>
										<div className="text-start flex flex-col gap-5 w-full">
											<p>
												To place an order, click the
												"Add to Cart" button on any
												product page. You can then
												proceed to checkout and complete
												your purchase.
											</p>
											<p>We hope to see you back soon!</p>
											<p>Thanks for shopping with us.</p>
										</div>
									</li>
								)}
							</ul>
						</div>
					)}
				</div>
			</div>

			<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
				<div className="flex justify-between text-base font-black text-gray-300">
					<p>Total</p>
					<p>${subTotal}</p>
				</div>
			</div>
		</div>
	);
};

export default Orders;
