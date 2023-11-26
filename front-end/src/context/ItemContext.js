"use client";

import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "@/context/CartContext";
import { url } from "@/data";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
	const { items } = useContext(CartContext);
	const [allItems, setAllItems] = useState([]);

	const addItem = (item) => {
		const data = {
			color: item.color,
			discription: item.description,
			image: item.image,
			name: item.name,
			price: item.price,
		};

		axios
			.post(`${url}/items`, data)
			.then((res) => {
				console.log(res.data);
				setAllItems((prev) => {
					prev.concat(item);
				});
				toast.success(`Product Added Successfully`);
			})
			.catch((err) => {
				toast.error("Something is wrong");
				console.log(err);
			});
	};

	const removeItem = (id) => {
		axios
			.delete(`${url}/items/${id}`)
			.then((res) => {
				console.log(res.data);
				const itemsFilter = items.filter((i) => i.id != id);
				setAllItems(itemsFilter);
				toast.success(`Product Deleted`);
			})
			.catch((err) => {
				toast.error("Something is wrong");
				console.log(err);
			});
	};

	useEffect(() => {
		setAllItems(items);
	}, [items]);

	return (
		<ItemContext.Provider value={{ allItems, addItem, removeItem }}>
			{children}
		</ItemContext.Provider>
	);
};
