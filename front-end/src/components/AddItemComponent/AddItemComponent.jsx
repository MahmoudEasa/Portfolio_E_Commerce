"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { ItemContext } from "@/context/ItemContext";
import { useRouter } from "next/navigation";

const AddItemComponent = (props) => {
	const router = useRouter();
	const { user } = useContext(UserContext);
	const { allItems, addItem, updateItem } = useContext(ItemContext);
	const [formData, setFormData] = useState({
		color: "",
		discription: "",
		image: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
		name: "",
		price: 0,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (props.method == "addItem") {
			addItem(formData);
			setFormData({
				color: "",
				discription: "",
				// image: "",
				name: "",
				price: 0,
			});
		} else updateItem(props.update_item, formData);
	};

	if (!user || !user.is_admin) {
		if (typeof window !== "undefined") {
			router.push("/");
		}
	}

	useEffect(() => {
		if (props.update_item) {
			allItems.map((item) => {
				if (item.id == props.update_item) {
					setFormData({
						color: item.color,
						discription: item.discription,
						// image: item.image,
						name: item.name,
						price: item.price,
					});
				}
			});
		}
	}, [allItems, props.update_item]);

	return (
		<>
			<div
				className="flex min-h-full flex-1 flex-col justify-center
                        px-6 py-12 lg:px-8"
			>
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<Image
						width={100}
						height={100}
						className="mx-auto h-10 w-auto"
						src="/images/logo2.png"
						alt="Logo"
					/>
					<h2
						className="mt-10 text-center text-2xl font-bold leading-9
                                tracking-tight text-gray-300"
					>
						{props.update_item
							? "Update Product"
							: "Create Product"}
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={handleSubmit}>
						{/* Name */}
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6
                                        text-gray-300"
							>
								Product Name
							</label>
							<div className="mt-2">
								<input
									id="name"
									name="name"
									type="text"
									autoComplete="name"
									required
									value={formData.name}
									onChange={(e) =>
										setFormData({
											...formData,
											name: e.target.value,
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

						{/* Description */}
						<div>
							<label
								htmlFor="discription"
								className="block text-sm font-medium leading-6
                                        text-gray-300"
							>
								Description
							</label>
							<div className="mt-2">
								<input
									id="discription"
									name="discription"
									type="text"
									autoComplete="discription"
									required
									value={formData.discription}
									onChange={(e) =>
										setFormData({
											...formData,
											discription: e.target.value,
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

						{/* Price */}
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="price"
									className="block text-sm font-medium leading-6
                                            text-gray-300"
								>
									Price ($)
								</label>
							</div>
							<div className="mt-2">
								<input
									id="price"
									name="price"
									type="number"
									autoComplete="price"
									required
									value={formData.price}
									onChange={(e) =>
										setFormData({
											...formData,
											price: e.target.value,
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

						{/* Color */}
						<div>
							<label
								htmlFor="color"
								className="block text-sm font-medium leading-6
                                        text-gray-300"
							>
								Color
							</label>
							<div className="mt-2">
								<input
									id="color"
									name="color"
									type="text"
									autoComplete="color"
									required
									value={formData.color}
									onChange={(e) =>
										setFormData({
											...formData,
											color: e.target.value,
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

						{/* Image */}
						{/* <div>
							<label
								htmlFor="image"
								className="block text-sm font-medium leading-6
                                        text-gray-300"
							>
								Image
							</label>
							<div className="mt-2">
								<input
									id="image"
									name="image"
									type="text"
									autoComplete="image"
									required
									value={formData.image}
									onChange={(e) =>
										setFormData({
											...formData,
											image: e.target.value,
										})
									}
									className="block w-full rounded-md border-0 py-1.5
                                        text-gray-900 shadow-sm ring-1 ring-inset
                                        ring-gray-300 placeholder:text-gray-300
                                        focus:ring-2 focus:ring-inset px-2
                                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div> */}

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
								{props.update_item ? "Update" : "Create"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddItemComponent;
