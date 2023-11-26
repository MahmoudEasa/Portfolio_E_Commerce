"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "@/data";
import { useRouter } from "next/navigation";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState("");
	const [errors, setErrors] = useState("");
	const router = useRouter();

	const login = (userData) => {
		setErrors("");

		axios
			.post(`${url}/login`, userData)
			.then((res) => {
				console.log(res.data);
				localStorage.setItem("user", JSON.stringify(res.data));
				setUser(res.data);
				const carts = JSON.parse(localStorage.getItem("cart"));
				if (carts) {
					carts.map((cart) => {
						const data = {
							user_id: user.id,
							item_id: cart.id,
						};

						axios
							.post(`${url}/carts`, data)
							.then((res) => console.log(res.data))
							.catch((err) => {
								toast.error("Something is wrong");
								console.log(err);
							});
					});
				}

				toast.success(`Login Successful ${res.data.username}`);
				router.back();
			})
			.catch((err) => {
				toast.error(err.response.data.message);
				setErrors(err.response.data.message);
				console.log(err);
			});
	};

	const singin = (userData) => {
		setErrors("");

		axios
			.post(`${url}/users`, userData)
			.then((res) => {
				console.log(res.data);
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
				console.log(res.data);
				localStorage.removeItem("user");
				setUser("");
				toast.success(`Logout Successful`);
				router.push("/", { forceRefresh: true });
			})
			.catch((err) => {
				toast.error("Something is wrong");
				console.log(err);
			});
	};

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem("user"));
		setUser(storedData);
	}, []);

	return (
		<UserContext.Provider value={{ user, login, logout, singin, errors }}>
			{children}
		</UserContext.Provider>
	);
};
