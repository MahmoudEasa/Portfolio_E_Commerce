"use client";

import Image from "next/image";
import { useState, useContext } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { ItemContext } from "@/context/ItemContext";
import { CartContext } from "@/context/CartContext";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";

const product = {
	name: "Basic Tee 6-Pack",
	price: "$192",
	href: "#",
	images: [
		{
			src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
			alt: "Two each of gray, white, and black shirts laying flat.",
		},
		{
			src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
			alt: "Model wearing plain black basic tee.",
		},
		{
			src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
			alt: "Model wearing plain gray basic tee.",
		},
		{
			src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
			alt: "Model wearing plain white basic tee.",
		},
	],
	colors: [
		{ name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
		{ name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
		{ name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
	],
	sizes: [
		{ name: "XXS", inStock: false },
		{ name: "XS", inStock: true },
		{ name: "S", inStock: true },
		{ name: "M", inStock: true },
		{ name: "L", inStock: true },
		{ name: "XL", inStock: true },
		{ name: "2XL", inStock: true },
		{ name: "3XL", inStock: true },
	],
	description:
		'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
	highlights: [
		"Hand cut and sewn locally",
		"Dyed with our proprietary colors",
		"Pre-washed & pre-shrunk",
		"Ultra-soft 100% cotton",
	],
	details:
		'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Item = ({ params }) => {
	const { addToCart } = useContext(CartContext);
	const { allItems } = useContext(ItemContext);
	const { user } = useContext(UserContext);
	const [selectedColor, setSelectedColor] = useState(product.colors[0]);
	const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
	let item = allItems.find((i) => i.id == params.item);
	if (!item) item = {};

	const handleSubmit = (e) => {
		e.preventDefault();
		addToCart(item);
	};

	return (
		<div className="">
			<div className="pt-6">
				{/* Image gallery */}
				<div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
					<div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
						<Image
							width={100}
							height={100}
							src={item.image}
							alt={item.name}
							className="h-full w-full object-cover object-center"
						/>
					</div>
				</div>

				{/* Product info */}
				<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
					<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
						<h1 className="text-2xl font-bold tracking-tight text-gray-400 sm:text-3xl">
							{item.name}
						</h1>
					</div>

					{/* Options */}
					<div className="mt-4 lg:row-span-3 lg:mt-0">
						<h2 className="sr-only">Product information</h2>
						<p className="text-3xl tracking-tight text-gray-400">
							${item.price}
						</p>

						{/* Reviews */}
						<div className="mt-6">
							<h3 className="sr-only">Reviews</h3>
							<div className="flex items-center">
								<div className="flex items-center">
									{[0, 1, 2, 3, 4].map((rating) => (
										<StarIcon
											key={rating}
											className={classNames(
												reviews.average > rating
													? "text-gray-600"
													: "text-gray-200",
												"h-5 w-5 flex-shrink-0"
											)}
											aria-hidden="true"
										/>
									))}
								</div>
								<p className="sr-only">
									{reviews.average} out of 5 stars
								</p>
								<Link
									href={reviews.href}
									className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
								>
									{reviews.totalCount} reviews
								</Link>
							</div>
						</div>

						<form className="mt-10" onSubmit={handleSubmit}>
							{/* Colors */}
							<div>
								<h3 className="text-sm font-medium text-gray-400">
									Color
								</h3>

								<RadioGroup
									value={selectedColor}
									onChange={setSelectedColor}
									className="mt-4"
								>
									<RadioGroup.Label className="sr-only">
										Choose a color
									</RadioGroup.Label>
									<div className="flex items-center space-x-3">
										{product.colors.map((color) => (
											<RadioGroup.Option
												key={color.name}
												value={color}
												className={({
													active,
													checked,
												}) =>
													classNames(
														color.selectedClass,
														active && checked
															? "ring ring-offset-1"
															: "",
														!active && checked
															? "ring-2"
															: "",
														"relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
													)
												}
											>
												<RadioGroup.Label
													as="span"
													className="sr-only"
												>
													{color.name}
												</RadioGroup.Label>
												<span
													aria-hidden="true"
													className={classNames(
														color.class,
														"h-8 w-8 rounded-full border border-white border-opacity-10"
													)}
												/>
											</RadioGroup.Option>
										))}
									</div>
								</RadioGroup>
							</div>

							{/* Sizes */}
							<div className="mt-10">
								<div className="flex items-center justify-between">
									<h3 className="text-sm font-medium text-gray-400">
										Size
									</h3>
									<Link
										href="#"
										className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
									>
										Size guide
									</Link>
								</div>

								<RadioGroup
									value={selectedSize}
									onChange={setSelectedSize}
									className="mt-4"
								>
									<RadioGroup.Label className="sr-only">
										Choose a size
									</RadioGroup.Label>
									<div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
										{product.sizes.map((size) => (
											<RadioGroup.Option
												key={size.name}
												value={size}
												disabled={!size.inStock}
												className={({ active }) =>
													classNames(
														size.inStock
															? "cursor-pointer bg-black text-gray-400 shadow-sm"
															: "cursor-not-allowed bg-gray-400 text-gray-900",
														active
															? "ring-2 ring-indigo-500"
															: "",
														"group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-600 hover:text-gray-200 focus:outline-none sm:flex-1 sm:py-6"
													)
												}
											>
												{({ active, checked }) => (
													<>
														<RadioGroup.Label as="span">
															{size.name}
														</RadioGroup.Label>
														{size.inStock ? (
															<span
																className={classNames(
																	active
																		? "border"
																		: "border-2",
																	checked
																		? "border-indigo-500"
																		: "border-transparent",
																	"pointer-events-none absolute -inset-px rounded-md"
																)}
																aria-hidden="true"
															/>
														) : (
															<span
																aria-hidden="true"
																className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
															>
																<svg
																	className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
																	viewBox="0 0 100 100"
																	preserveAspectRatio="none"
																	stroke="currentColor"
																>
																	<line
																		x1={0}
																		y1={100}
																		x2={100}
																		y2={0}
																		vectorEffect="non-scaling-stroke"
																	/>
																</svg>
															</span>
														)}
													</>
												)}
											</RadioGroup.Option>
										))}
									</div>
								</RadioGroup>
							</div>

							<button
								type="submit"
								className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								Add to Cart
							</button>
							{user && user.is_admin && (
								<Link
									href={`/add_item/${item.id}`}
									className="mt-5 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									Update Item
								</Link>
							)}
						</form>
					</div>

					<div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
						{/* Description and details */}
						<div>
							<h3 className="text-sm font-medium text-gray-400">
								Description
							</h3>

							<div className="space-y-6 mt-4">
								<p className="text-base text-gray-400">
									{item.discription}
								</p>
							</div>
						</div>

						<div className="mt-10">
							<h3 className="text-sm font-medium text-gray-400">
								Highlights
							</h3>

							<div className="mt-4">
								<ul
									role="list"
									className="list-disc space-y-2 pl-4 text-sm"
								>
									{product.highlights.map((highlight) => (
										<li
											key={highlight}
											className="text-gray-200"
										>
											<span className="text-gray-400">
												{highlight}
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="mt-10">
							<h2 className="text-sm font-medium text-gray-400">
								Details
							</h2>

							<div className="mt-4 space-y-6">
								<p className="text-sm text-gray-400">
									{product.details}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Item;
