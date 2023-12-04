"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { url, deleteImage } from "@/data";
import { useRouter } from "next/navigation";
import { deleteObject } from "firebase/storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState("");
	const [errors, setErrors] = useState("");
	const router = useRouter();

	const login = (userData) => {
		setErrors("");

		axios
			.post(`${url}/login`, userData)
			.then(async (res) => {
				localStorage.setItem("user", JSON.stringify(res.data));
				setUser(res.data);
				const carts = JSON.parse(localStorage.getItem("cart"));
				if (carts) {
					try {
						const promises = carts.map(async (cart) => {
							const data = {
								user_id: res.data.id,
								item_id: cart.item.id,
								qty: cart.qty,
							};
							const response = await axios.post(
								`${url}/carts`,
								data
							);
							return response.data;
						});

						await Promise.all(promises);
					} catch (error) {
						toast.error("Something is wrong");
						console.log(error);
					}
				}

				toast.success(`Login Successful ${res.data.username}`);
				router.back();
			})
			.catch((err) => {
				if (err.response.data) {
					toast.error(err.response.data.message);
					setErrors(err.response.data.message);
				} else toast.error("Something is wrong");

				console.log(err);
			});
	};

	const signup = (userData) => {
		setErrors("");

		axios
			.post(`${url}/users`, userData)
			.then((res) => {
				toast.success(`Sign In Successful ${res.data.username}`);
				router.push("/login");
			})
			.catch((err) => {
				toast.error(err.response.data.message);
				setErrors(err.response.data.message);
				console.log(err);
			});
	};

	const logout = () => {
		axios
			.get(`${url}/logout`)
			.then((res) => {
				localStorage.removeItem("user");
				setUser("");
				toast.success(`Logout Successful`);
				if (typeof window !== "undefined") {
					window.location.reload();
				}
			})
			.catch((err) => {
				toast.error("Something is wrong");
				console.log(err);
			});
	};

	const updateUser = (obj, imgRef) => {
		axios
			.put(`${url}/users/${user.id}`, obj)
			.then((res) => {
				if (imgRef) deleteImage(null, null, user.photo);
				localStorage.setItem("user", JSON.stringify(res.data));
				setUser(res.data);
				toast.success("The data has been updated successfully");
			})
			.catch((err) => {
				if (imgRef) {
					deleteObject(imgRef).catch((error) => {
						console.log(error);
					});
				}
				if (err.response) {
					toast.error(err.response.data.message);
					setErrors(err.response.data.message);
				} else toast.error("Something is wrong");
				console.log(err);
			});
	};

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem("user"));
		setUser(storedData);
	}, []);

	return (
		<UserContext.Provider
			value={{ user, login, logout, signup, errors, updateUser }}
		>
			{children}
		</UserContext.Provider>
	);
};
