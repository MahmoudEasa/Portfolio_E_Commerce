"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/data";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState("");

	const login = () => {
		const data = {
			email: "mu01011422865@gmail.com",
			password: "123456",
		};

		axios
			.post(`${url}/login`, data)
			.then((res) => {
				console.log(res.data);
				localStorage.setItem("user", JSON.stringify(res.data));
				setUser(res.data);
			})
			.catch((err) => {
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
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};
