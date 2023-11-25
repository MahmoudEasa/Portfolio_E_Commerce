"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";

import { url } from "@/data";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [open, setOpen] = useState(false);
	const user = JSON.parse(localStorage.getItem("user"));
	let runGetData = true;

	const toggleOpen = () => {
		setOpen((prev) => !prev);
	};

	const addToCart = (item) => {
		let data;

		if (user)
			data = {
				user_id: user.id,
				item_id: item.id,
			};

		if (!user) {
			setCart((prev) => {
				prev.push(item);
			});
			localStorage.setItem("cart", JSON.stringify(cart));
		} else {
			axios
				.post(`${url}/carts`, data)
				.then((res) => {
					console.log(res.data);
					setCart((prev) => {
						prev.push(item);
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const removeFromCart = (id) => {
		const newCart = cart.filter((item) => item.id != id);

		if (!user) {
			setCart(newCart);
			localStorage.setItem("cart", JSON.stringify(cart));
		} else {
			axios
				.get(`${url}/carts`)
				.then((res) => {
					const c = res.data.find((i) => i.item_id == id);
					axios
						.delete(`${url}/carts/${c.id}`)
						.then((res) => {
							console.log(res.data);
							setCart(newCart);
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const getCarts = async () => {
		if (runGetData) {
			const user1 = JSON.parse(localStorage.getItem("user"));

			if (!user1) {
				const storedData = JSON.parse(localStorage.getItem("cart"));
				if (storedData) setCart(storedData);
			} else {
				localStorage.removeItem("cart");

				try {
					const [cartsResponse, itemsResponse] = await Promise.all([
						axios.get(`${url}/carts`),
						axios.get(`${url}/items`),
					]);

					const carts = cartsResponse.data;
					const items = itemsResponse.data;

					const filterItems = [];

					carts.map((c) => {
						if (c.user_id === user.id) {
							const item = items.find((i) => c.item_id === i.id);
							if (item) filterItems.push(item);
						}
					});

					setCart(filterItems);
				} catch (err) {
					console.log(err);
				}
			}
			runGetData = false;
		}
	};

	useEffect(() => {
		getCarts();
	}, []);

	return (
		<CartContext.Provider
			value={{ cart, open, addToCart, removeFromCart, toggleOpen }}
		>
			{children}
		</CartContext.Provider>
	);
};
