"use client";

import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "@/context/CartContext";
import { url, deleteImage } from "@/data";
import { deleteObject } from "firebase/storage";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
	const { items } = useContext(CartContext);
	const [allItems, setAllItems] = useState([]);

	const addItem = (item, imgRef) => {
		const data = {
			color: item.color,
			discription: item.discription,
			image: item.image,
			name: item.name,
			price: Number(item.price),
		};

		axios
			.post(`${url}/items`, data)
			.then((res) => {
				const newItems = [...allItems, res.data];
				setAllItems(newItems);
				toast.success(`Product Added Successfully`);
			})
			.catch((err) => {
				if (imgRef) {
					deleteObject(imgRef).catch((error) => {
						console.log(error);
					});
				}
				if (err.response) toast.error(err.response.data.message);
				else toast.error("Something is wrong");
				console.log(err);
			});
	};

	const updateItem = (id, itemData, imgRef) => {
		axios
			.put(`${url}/items/${id}`, itemData)
			.then((res) => {
				if (imgRef) deleteImage(id, allItems);
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
				if (imgRef) {
					deleteObject(imgRef).catch((error) => {
						console.log(error);
					});
				}
				if (err.response) toast.error(err.response.data.message);
				else toast.error("Something is wrong");
				console.log(err);
			});
	};

	const removeItem = (id) => {
		axios
			.delete(`${url}/items/${id}`)
			.then((res) => {
				const itemsFilter = allItems.filter((i) => i.id != id);
				deleteImage(id, allItems);
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
