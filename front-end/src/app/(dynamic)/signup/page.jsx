"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const SingUp = () => {
	const router = useRouter();
	const { user, signup, errors } = useContext(UserContext);
	const [formData, setFormData] = useState({
		address: "",
		email: "",
		is_admin: false,
		phone: "",
		username: "",
		password: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData);
	};

	if (user) router.push("/");

	return (
		<>
			<div
				className="flex min-h-full flex-1 flex-col justify-center
							px-6 py-12 lg:px-8"
			>
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="/images/logo2.png"
						alt="Logo"
					/>
					<h2
						className="mt-10 text-center text-2xl font-bold leading-9
									tracking-tight text-gray-300"
					>
						Sign Up
					</h2>
					{errors ? (
						<h3
							className="mt-5 text-center text-2xl font-bold leading-9
									tracking-tight text-red-400"
						>
							{errors}
						</h3>
					) : (
						""
					)}
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={handleSubmit}>
						{/* User Name */}
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6
											text-gray-300"
							>
								User Name
							</label>
							<div className="mt-2">
								<input
									id="username"
									name="username"
									type="text"
									autoComplete="username"
									required
									value={formData.username}
									onChange={(e) =>
										setFormData({
											...formData,
											username: e.target.value,
										})
									}
									className="block w-full rounded-md border-0 py-1.5
											text-gray-900 shadow-sm ring-1 ring-inset
											ring-gray-300 placeholder:text-gray-300
											focus:ring-2 focus:ring-inset px-2
											focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						{/* Email Address */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6
											text-gray-300"
							>
								Email Address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									value={formData.email}
									onChange={(e) =>
										setFormData({
											...formData,
											email: e.target.value,
										})
									}
									className="block w-full rounded-md border-0 py-1.5
											text-gray-900 shadow-sm ring-1 ring-inset
											ring-gray-300 placeholder:text-gray-300
											focus:ring-2 focus:ring-inset px-2
											focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						{/* Password */}
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6
												text-gray-300"
								>
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									requiredvalue={formData.password}
									onChange={(e) =>
										setFormData({
											...formData,
											password: e.target.value,
										})
									}
									className="block w-full rounded-md border-0 py-1.5
												text-gray-900 shadow-sm ring-1
												ring-inset ring-gray-300
												placeholder:text-gray-300 focus:ring-2
												focus:ring-inset focus:ring-indigo-600
												sm:text-sm sm:leading-6  px-2"
								/>
							</div>
						</div>

						{/* Address */}
						<div>
							<label
								htmlFor="address"
								className="block text-sm font-medium leading-6
											text-gray-300"
							>
								Address
							</label>
							<div className="mt-2">
								<input
									id="address"
									name="address"
									type="address"
									autoComplete="address"
									required
									value={formData.address}
									onChange={(e) =>
										setFormData({
											...formData,
											address: e.target.value,
										})
									}
									className="block w-full rounded-md border-0 py-1.5
											text-gray-900 shadow-sm ring-1 ring-inset
											ring-gray-300 placeholder:text-gray-300
											focus:ring-2 focus:ring-inset px-2
											focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						{/* Phone Number */}
						<div>
							<label
								htmlFor="phone"
								className="block text-sm font-medium leading-6
											text-gray-300"
							>
								Phone Number
							</label>
							<div className="mt-2">
								<input
									id="phone"
									name="phone"
									type="phone"
									autoComplete="phone"
									required
									value={formData.phone}
									onChange={(e) =>
										setFormData({
											...formData,
											phone: e.target.value,
										})
									}
									className="block w-full rounded-md border-0 py-1.5
											text-gray-900 shadow-sm ring-1 ring-inset
											ring-gray-300 placeholder:text-gray-300
											focus:ring-2 focus:ring-inset px-2
											focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md
											bg-indigo-600 px-3 py-1.5 text-sm font-semibold
											leading-6 text-white shadow-sm
											hover:bg-indigo-500 focus-visible:outline
											focus-visible:outline-2 focus-visible:outline-offset-2
											focus-visible:outline-indigo-600"
							>
								Sign Up
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						You have an account?{" "}
						<Link
							href={"/login"}
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default SingUp;
