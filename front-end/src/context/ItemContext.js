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
			discription: item.discription,
			image: item.image,
			name: item.name,
			price: item.price,
		};

		axios
			.post(`${url}/items`, data)
			.then((res) => {
				setAllItems((prev) => {
					[...prev, item];
				});
				toast.success(`Product Added Successfully`);
			})
			.catch((err) => {
				toast.error("Something is wrong");
				console.log(err);
			});
	};

	const updateItem = (id, itemData) => {
		axios
			.put(`${url}/items/${id}`, itemData)
			.then((res) => {
				const updatedAllItems = allItems.map((item) => {
					if (item.id == id) {
						return { ...item, ...itemData };
					}

					return item;
				});

				setAllItems(updatedAllItems);
				toast.success("The data has been updated successfully");
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
				const itemsFilter = allItems.filter((i) => i.id != id);
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
		<ItemContext.Provider
			value={{ allItems, addItem, updateItem, removeItem }}
		>
			{children}
		</ItemContext.Provider>
	);
};
