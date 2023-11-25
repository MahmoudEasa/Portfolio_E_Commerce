"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";
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
				router.push("/");
			})
			.catch((err) => {
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
				router.push("/login");
			})
			.catch((err) => {
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
			})
			.catch((err) => {
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
