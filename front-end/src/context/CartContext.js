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
	const user = JSON.parse(localStorage.getItem("user"));

	const toggleOpen = () => {
		setOpen((prev) => !prev);
	};

	const addToCart = (item) => {
		if (!user) {
			setCart((prev) => {
				prev.concat(item);
			});
			localStorage.setItem("cart", JSON.stringify(cart));
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
		const itemsResponse = await axios.get(`${url}/items`);
		const allItems = itemsResponse.data;
		setItems(allItems);

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
						const item = allItems.find((i) => c.item_id === i.id);
						const data = { item, cart_id: c.id };
						if (item) filterItems.push(data);
					}
				});

				setCart(filterItems);
			} catch (err) {
				toast.error("Something is wrong");
				console.log(err);
			}
		}
	};

	const removeFromCart = (id, cart_id) => {
		if (!user) {
			const carts = JSON.parse(localStorage.getItem("cart"));
			const newCart = carts.filter((item) => item.id != id);
			setCart(newCart);
			localStorage.setItem("cart", JSON.stringify(newCart));
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

	useEffect(() => {
		getCarts();
	}, [open]);

	return (
		<CartContext.Provider
			value={{ cart, items, open, addToCart, removeFromCart, toggleOpen }}
		>
			{children}
		</CartContext.Provider>
	);
};
