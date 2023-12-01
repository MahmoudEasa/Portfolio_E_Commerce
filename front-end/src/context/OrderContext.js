"use client";

import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "@/data";
import { CartContext } from "@/context/CartContext";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
	const { items } = useContext(CartContext);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);

	const getOrders = async () => {
		const user = JSON.parse(localStorage.getItem("user"));
		setLoading(true);

		if (user) {
			try {
				const ordersResponse = await axios.get(`${url}/buys`);
				const allOrders = ordersResponse.data;
				const filterItems = [];

				allOrders.map((c) => {
					if (c.user_id === user.id) {
						if (items) {
							const item = items.find((i) => c.item_id === i.id);
							const data = { item, order_id: c.id };
							if (item) filterItems.push(data);
						}
					}
				});

				setOrders(filterItems);
			} catch (err) {
				toast.error("Something is wrong");
				console.log(err);
			}
		}
		setLoading(false);
	};

	const removeOrder = (order_id) => {
		axios
			.delete(`${url}/buys/${order_id}`)
			.then((res) => {
				const allOrders = orders.filter((c) => c.order_id != order_id);
				setOrders(allOrders);
				toast.success(res.data.message);
			})
			.catch((err) => {
				toast.error("Something is wrong");
				console.log(err);
			});
	};

	useEffect(() => {
		getOrders();
	}, [items, getOrders]);

	return (
		<OrderContext.Provider
			value={{
				orders,
				removeOrder,
				loading,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};
