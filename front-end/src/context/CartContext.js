"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { url } from "@/data";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [items, setItems] = useState([]);
	const [cart, setCart] = useState([]);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const toggleOpen = () => {
		setOpen((prev) => !prev);
	};

	const addToCart = (item) => {
		const user = JSON.parse(localStorage.getItem("user"));
		let found = false;
		const newCart = [...cart];

		cart.map((c) => {
			if (c.item.id == item.id) {
				found = true;
			}
		});

		if (!user) {
			if (found) {
				toast.info("Product already in Cart");
			} else {
				const newItem = { item, cart_id: item.id, qty: 1 };
				newCart.push(newItem);
				setCart(newCart);
				localStorage.setItem("cart", JSON.stringify(newCart));
				toast.success("Product Added to Cart");
			}
		} else {
			if (found) {
				toast.info("Product already in Cart");
			} else {
				const data = {
					user_id: user.id,
					item_id: item.id,
					qty: 1,
				};
				axios
					.post(`${url}/carts`, data)
					.then((res) => {
						const newItem = { item, cart_id: res.id, qty: 1 };
						newCart.push(newItem);
						setCart(newCart);
						toast.success("Product Added to Cart");
					})
					.catch((err) => {
						toast.error("Something is wrong");
						console.log(err);
					});
			}
		}
	};

	const getCarts = async () => {
		const user = JSON.parse(localStorage.getItem("user"));
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

		if (!user) {
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
							const data = { item, cart_id: c.id, qty: c.qty };
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
		const user = JSON.parse(localStorage.getItem("user"));

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

	const checkout = async (checkoutData) => {
		const user = JSON.parse(localStorage.getItem("user"));

		if (!user) {
			setOpen(false);
			toast.warn("You must be signed in to checkout.");
			router.push("/login");
		} else if (checkoutData && checkoutData.length > 0) {
			try {
				const promises = [];

				checkoutData.map(async (item) => {
					const data = {
						user_id: user.id,
						item_id: item.item.id,
						qty: item.qty,
					};

					promises.push(axios.post(`${url}/buys`, data));
					promises.push(axios.delete(`${url}/carts/${item.cart_id}`));
				});

				await axios.all(promises);
				toast.success(`Your order has been placed successfully.`);
				toggleOpen();
			} catch (error) {
				toast.error("Something is wrong");
				console.log(error);
			}
		}
	};

	const confirmCartCount = (id, qty) => {
		const user = JSON.parse(localStorage.getItem("user"));

		if (!user) {
			const newCart = [...cart];
			newCart.map((c) => {
				if (c.cart_id == id) {
					c.qty = qty;
					c.confirm = false;
				}
			});
			localStorage.setItem("cart", JSON.stringify(newCart));
			toast.success("Product Added to Cart");
		} else {
			axios
				.put(`${url}/carts/${id}`, { qty: qty })
				.then((res) => {
					toast.success("Confirmed, thank you.");
				})
				.catch((err) => {
					toast.error("Something is wrong");
					console.log(err);
				});
		}
	};

	const setConfirm = (id, isConfirm) => {
		const newCarts = [...cart];
		newCarts.map((c) => {
			if (c.cart_id == id) c.confirm = isConfirm;
		});
		setCart(newCarts);
	};

	const increaseCount = (id) => {
		const newCarts = [...cart];
		newCarts.map((c) => {
			if (c.cart_id == id) {
				c.qty++;
				setConfirm(c.cart_id, true);
			}
		});
		setCart(newCarts);
	};

	const decreaseCount = (id) => {
		const newCarts = [...cart];
		newCarts.map((c) => {
			if (c.cart_id == id)
				if (c.qty > 1) {
					c.qty--;
					setConfirm(c.cart_id, true);
				}
		});
		setCart(newCarts);
	};

	const confirmCount = (caret_id, qty) => {
		confirmCartCount(caret_id, qty);
		setConfirm(caret_id, false);
	};

	const setCartsFun = () => {
		const newCarts = cart.map((c) => {
			return { ...c, confirm: false };
		});
		setCart(newCarts);
	};

	useEffect(() => {
		setCartsFun();
	}, []);

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
				confirmCartCount,
				increaseCount,
				decreaseCount,
				confirmCount,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
