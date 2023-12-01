"use client";

import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { UserContext } from "@/context/UserContext";

const Profile = () => {
	const router = useRouter();
	const { updateUser } = useContext(UserContext);
	const user = JSON.parse(localStorage.getItem("user"));
	const [formData, setFormData] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		updateUser(formData);
	};

	useEffect(() => {
		if (!user) router.push("/");
		else {
			setFormData({
				address: user.address,
				email: user.email,
				username: user.username,
			});
		}
	}, []);

	return (
		<form onSubmit={handleSubmit}>
			<div className="space-y-12 p-10">
				<div className="border-b border-gray-300/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-300">
						Profile
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-200">
						This information will be displayed publicly so be
						careful what you share.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						{/* Username */}
						<div className="sm:col-span-4">
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 text-gray-300"
							>
								Username
							</label>
							<div className="mt-2">
								<div
									className="flex rounded-md shadow-sm ring-1 ring-inset
                                                ring-gray-300 focus-within:ring-2 focus-within:ring-inset
                                                focus-within:ring-indigo-600 sm:max-w-md"
								>
									<input
										type="text"
										name="username"
										id="username"
										autoComplete="username"
										className="block flex-1 border-0 bg-transparent
                                                    py-1.5 pl-2 text-gray-300
                                                    focus:ring-0 sm:text-sm sm:leading-6"
										value={formData.username}
										onChange={(e) =>
											setFormData({
												...formData,
												username: e.target.value,
											})
										}
									/>
								</div>
							</div>
						</div>

						{/* photo
						<div className="col-span-full">
							<label
								htmlFor="photo"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Photo
							</label>
							<div className="mt-2 flex items-center gap-x-3">
								<UserCircleIcon
									className="h-12 w-12 text-gray-300"
									aria-hidden="true"
								/>
								<button
									type="button"
									className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
								>
									Change
								</button>
							</div>
						</div> */}
					</div>
				</div>

				<div className="border-b border-gray-300/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-300">
						Personal Information
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-200">
						Use a permanent address where you can receive mail.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						{/* Email address */}
						<div className="sm:col-span-4">
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-300"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									className="block w-full rounded-md border-0 py-1.5  pl-2
                                                text-gray-900 shadow-sm ring-1 ring-inset
                                                ring-gray-300 focus:ring-2 focus:ring-inset
                                                focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={formData.email}
									onChange={(e) =>
										setFormData({
											...formData,
											email: e.target.value,
										})
									}
								/>
							</div>
						</div>
						{/* Address */}
						<div className="sm:col-span-4">
							<label
								htmlFor="address"
								className="block text-sm font-medium leading-6 text-gray-300"
							>
								Address
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="address"
									id="address"
									autoComplete="address"
									className="block w-full rounded-md border-0 py-1.5 pl-2
                                            text-gray-900 shadow-sm ring-1 ring-inset
                                            ring-gray-300 focus:ring-2 focus:ring-inset
                                            focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={formData.address}
									onChange={(e) =>
										setFormData({
											...formData,
											address: e.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button
					type="submit"
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Save
				</button>
			</div>
		</form>
	);
};

export default Profile;
