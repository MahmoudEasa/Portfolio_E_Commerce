"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "@/data";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [items, setItems] = useState([]);
	const [cart, setCart] = useState([]);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const user = JSON.parse(localStorage.getItem("user"));

	const toggleOpen = () => {
		setOpen((prev) => !prev);
	};

	const addToCart = (item) => {
		if (!user) {
			const newCart = [...cart];
			const newItem = { item, cart_id: item.id };
			newCart.push(newItem);
			setCart(newCart);
			localStorage.setItem("cart", JSON.stringify(newCart));
			toast.success("Product Added to Cart");
		} else {
			const data = {
				user_id: user.id,
				item_id: item.id,
			};
			axios
				.post(`${url}/carts`, data)
				.then((res) => {
					toast.success("Product Added to Cart");
					console.log(res.data);
				})
				.catch((err) => {
					toast.error("Something is wrong");
					console.log(err);
				});
		}
	};

	const getCarts = async () => {
		const user1 = JSON.parse(localStorage.getItem("user"));
		setLoading(true);
		let allItems;

		try {
			const itemsResponse = await axios.get(`${url}/items`);
			allItems = itemsResponse.data;
			setItems(allItems);
		} catch (err) {
			toast.error("Something is wrong");
			console.log(err);
		}

		if (!user1) {
			const storedData = JSON.parse(localStorage.getItem("cart"));
			if (storedData) setCart(storedData);
		} else {
			localStorage.removeItem("cart");

			try {
				const cartsResponse = await axios.get(`${url}/carts`);
				const carts = cartsResponse.data;
				const filterItems = [];

				carts.map((c) => {
					if (c.user_id === user.id) {
						if (allItems) {
							const item = allItems.find(
								(i) => c.item_id === i.id
							);
							const data = { item, cart_id: c.id };
							if (item) filterItems.push(data);
						}
					}
				});

				setCart(filterItems);
			} catch (err) {
				toast.error("Something is wrong");
				console.log(err);
			}
		}
		setLoading(false);
	};

	const removeFromCart = (id, cart_id) => {
		if (!user) {
			const carts = JSON.parse(localStorage.getItem("cart"));
			const newCart = carts.filter((item) => item.cart_id != cart_id);
			setCart(newCart);
			localStorage.setItem("cart", JSON.stringify(newCart));
			toast.success(`Product Deleted`);
		} else {
			axios
				.delete(`${url}/carts/${cart_id}`)
				.then((res) => {
					console.log(res.data);
					const carts = cart.filter((c) => c.cart_id != cart_id);
					setCart(carts);
					toast.success(res.data.message);
				})
				.catch((err) => {
					toast.error("Something is wrong");
					console.log(err);
				});
		}
	};

	const allProducts = [
		{
			id: 111,
			title: "iPhone 9",
			description: "An apple mobile which is nothing like apple",
			price: 549,
			discountPercentage: 12.96,
			rating: 4.69,
			stock: 94,
			brand: "Apple",
			category: "smartphones",
			thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
			images: [
				"https://i.dummyjson.com/data/products/1/1.jpg",
				"https://i.dummyjson.com/data/products/1/2.jpg",
				"https://i.dummyjson.com/data/products/1/3.jpg",
				"https://i.dummyjson.com/data/products/1/4.jpg",
				"https://i.dummyjson.com/data/products/1/thumbnail.jpg",
			],
		},
		{
			id: 112,
			title: "iPhone X",
			description:
				"SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
			price: 899,
			discountPercentage: 17.94,
			rating: 4.44,
			stock: 34,
			brand: "Apple",
			category: "smartphones",
			thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
			images: [
				"https://i.dummyjson.com/data/products/2/1.jpg",
				"https://i.dummyjson.com/data/products/2/2.jpg",
				"https://i.dummyjson.com/data/products/2/3.jpg",
				"https://i.dummyjson.com/data/products/2/thumbnail.jpg",
			],
		},
		{
			id: 113,
			title: "Samsung Universe 9",
			description:
				"Samsung's new variant which goes beyond Galaxy to the Universe",
			price: 1249,
			discountPercentage: 15.46,
			rating: 4.09,
			stock: 36,
			brand: "Samsung",
			category: "smartphones",
			thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
			images: ["https://i.dummyjson.com/data/products/3/1.jpg"],
		},
		{
			id: 114,
			title: "OPPOF19",
			description: "OPPO F19 is officially announced on April 2021.",
			price: 280,
			discountPercentage: 17.91,
			rating: 4.3,
			stock: 123,
			brand: "OPPO",
			category: "smartphones",
			thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
			images: [
				"https://i.dummyjson.com/data/products/4/1.jpg",
				"https://i.dummyjson.com/data/products/4/2.jpg",
				"https://i.dummyjson.com/data/products/4/3.jpg",
				"https://i.dummyjson.com/data/products/4/4.jpg",
				"https://i.dummyjson.com/data/products/4/thumbnail.jpg",
			],
		},
		{
			id: 115,
			title: "Huawei P30",
			description:
				"Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
			price: 499,
			discountPercentage: 10.58,
			rating: 4.09,
			stock: 32,
			brand: "Huawei",
			category: "smartphones",
			thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
			images: [
				"https://i.dummyjson.com/data/products/5/1.jpg",
				"https://i.dummyjson.com/data/products/5/2.jpg",
				"https://i.dummyjson.com/data/products/5/3.jpg",
			],
		},
		{
			id: 116,
			title: "MacBook Pro",
			description:
				"MacBook Pro 2021 with mini-LED display may launch between September, November",
			price: 1749,
			discountPercentage: 11.02,
			rating: 4.57,
			stock: 83,
			brand: "Apple",
			category: "laptops",
			thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png",
			images: [
				"https://i.dummyjson.com/data/products/6/1.png",
				"https://i.dummyjson.com/data/products/6/2.jpg",
				"https://i.dummyjson.com/data/products/6/3.png",
				"https://i.dummyjson.com/data/products/6/4.jpg",
			],
		},
		{
			id: 117,
			title: "Samsung Galaxy Book",
			description:
				"Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
			price: 1499,
			discountPercentage: 4.15,
			rating: 4.25,
			stock: 50,
			brand: "Samsung",
			category: "laptops",
			thumbnail: "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
			images: [
				"https://i.dummyjson.com/data/products/7/1.jpg",
				"https://i.dummyjson.com/data/products/7/2.jpg",
				"https://i.dummyjson.com/data/products/7/3.jpg",
				"https://i.dummyjson.com/data/products/7/thumbnail.jpg",
			],
		},
		{
			id: 118,
			title: "Microsoft Surface Laptop 4",
			description:
				"Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
			price: 1499,
			discountPercentage: 10.23,
			rating: 4.43,
			stock: 68,
			brand: "Microsoft Surface",
			category: "laptops",
			thumbnail: "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
			images: [
				"https://i.dummyjson.com/data/products/8/1.jpg",
				"https://i.dummyjson.com/data/products/8/2.jpg",
				"https://i.dummyjson.com/data/products/8/3.jpg",
				"https://i.dummyjson.com/data/products/8/4.jpg",
				"https://i.dummyjson.com/data/products/8/thumbnail.jpg",
			],
		},
		{
			id: 119,
			title: "Infinix INBOOK",
			description:
				"Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
			price: 1099,
			discountPercentage: 11.83,
			rating: 4.54,
			stock: 96,
			brand: "Infinix",
			category: "laptops",
			thumbnail: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
			images: [
				"https://i.dummyjson.com/data/products/9/1.jpg",
				"https://i.dummyjson.com/data/products/9/2.png",
				"https://i.dummyjson.com/data/products/9/3.png",
				"https://i.dummyjson.com/data/products/9/4.jpg",
				"https://i.dummyjson.com/data/products/9/thumbnail.jpg",
			],
		},
		{
			id: 120,
			title: "HP Pavilion 15-DK1056WM",
			description:
				"HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
			price: 1099,
			discountPercentage: 6.18,
			rating: 4.43,
			stock: 89,
			brand: "HP Pavilion",
			category: "laptops",
			thumbnail:
				"https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
			images: [
				"https://i.dummyjson.com/data/products/10/1.jpg",
				"https://i.dummyjson.com/data/products/10/2.jpg",
				"https://i.dummyjson.com/data/products/10/3.jpg",
				"https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
			],
		},
	];

	const checkout = async (checkoutData) => {
		if (checkoutData && checkoutData.length > 0) {
			try {
				const promises = [];

				checkoutData.map(async (item) => {
					const data = {
						user_id: user.id,
						item_id: item.item.id,
					};

					promises.push(axios.post(`${url}/buys`, data));
					promises.push(axios.delete(`${url}/carts/${item.cart_id}`));
				});

				const results = await axios.all(promises);
				toast.success(`Your order has been placed successfully.`);
				console.log(results);
				toggleOpen();
			} catch (error) {
				toast.error("Something is wrong");
				console.log(error);
			}
		}
	};

	useEffect(() => {
		getCarts();
	}, [open]);

	return (
		<CartContext.Provider
			value={{
				cart,
				items,
				open,
				addToCart,
				removeFromCart,
				toggleOpen,
				loading,
				checkout,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
