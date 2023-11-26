"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const Login = () => {
	const { user, login, errors } = useContext(UserContext);
	const [formData, setFormData] = useState({ email: "", password: "" });
	const router = useRouter();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(formData);
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
						Login to your account
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
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6
											text-gray-300"
							>
								Email address
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

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6
												text-gray-300"
								>
									Password
								</label>
								<div className="text-sm">
									<a
										href="#"
										className="font-semibold text-indigo-600
												hover:text-indigo-500"
									>
										Forgot password?
									</a>
								</div>
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
								Login
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Not a member?{" "}
						<Link
							href={"/signup"}
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
						>
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default Login;
