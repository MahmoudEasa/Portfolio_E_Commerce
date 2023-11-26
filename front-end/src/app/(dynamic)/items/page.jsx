"use client";

import Image from "next/image";
import { useContext } from "react";
import { ItemContext } from "@/context/ItemContext";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";

const products = [
	{
		id: 1,
		name: "Basic Tee",
		href: "#",
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
		imageAlt: "Front of men's Basic Tee in black.",
		price: "$35",
		color: "Black",
	},
	{
		id: 2,
		name: "Basic Tee",
		href: "#",
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
		imageAlt: "Front of men's Basic Tee in black.",
		price: "$35",
		color: "Black",
	},
	{
		id: 3,
		name: "Basic Tee",
		href: "#",
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
		imageAlt: "Front of men's Basic Tee in black.",
		price: "$35",
		color: "Black",
	},
	{
		id: 4,
		name: "Basic Tee",
		href: "#",
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
		imageAlt: "Front of men's Basic Tee in black.",
		price: "$35",
		color: "Black",
	},
	{
		id: 5,
		name: "Basic Tee",
		href: "#",
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
		imageAlt: "Front of men's Basic Tee in black.",
		price: "$35",
		color: "Black",
	},
	{
		id: 6,
		name: "Basic Tee",
		href: "#",
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
		imageAlt: "Front of men's Basic Tee in black.",
		price: "$35",
		color: "Black",
	},
];

const Items = () => {
	const { allItems } = useContext(ItemContext);
	const { addToCart } = useContext(CartContext);

	const itemsLen = allItems.length;

	return (
		<div className="">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-300">
					Customers also purchased
				</h2>

				<div
					className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2
								lg:grid-cols-4 xl:gap-x-8"
				>
					{itemsLen > 0 ? allItems.map((product) => (
						<div key={product.id} className="group relative">
							<div
								className="aspect-h-1 aspect-w-1 w-full overflow-hidden
											rounded-md bg-gray-200 lg:aspect-none
											group-hover:opacity-75 lg:h-80"
							>
								<img
									src={product.image}
									alt={product.name}
									className="h-full w-full object-cover object-center
												lg:h-full lg:w-full"
								/>
							</div>
							<div className="mt-4 flex justify-between">
								<div>
									<h3 className="text-sm text-gray-400">
										<Link href={`/items/${product.id}`}>
											<span
												aria-hidden="true"
												className="absolute inset-0"
											/>
											{product.name}
										</Link>
									</h3>
									<p className="mt-1 text-sm text-gray-300">
										{product.color}
									</p>
								</div>
								<p className="text-sm font-medium text-gray-300">
									${product.price}
								</p>
							</div>
						</div>
					)) : (
						<div className="py-6 text-center text-gray-300">
							<h3>
								No products found.
							</h3>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Items;
