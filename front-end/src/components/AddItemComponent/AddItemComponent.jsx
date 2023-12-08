"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { UserContext } from "@/context/UserContext";
import { ItemContext } from "@/context/ItemContext";
import { imageDb, logo } from "@/data";
import { toast } from "react-toastify";

const AddItemComponent = (props) => {
	const router = useRouter();
	const { user } = useContext(UserContext);
	const { allItems, addItem, updateItem } = useContext(ItemContext);
	const [isDisabled, setIsDisabled] = useState(false);
	const [image, setImage] = useState("");
	const uid = v4();
	const [formData, setFormData] = useState({
		color: "",
		discription: "",
		image: "",
		// image: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
		name: "",
		price: 0,
	});

	const handleImage = (image) => {
		setIsDisabled(true);
		// Store Image in Firebase
		const imgRef = ref(imageDb, `images/${uid}`);

		uploadBytes(imgRef, image)
			.then((res) => {
				getDownloadURL(imgRef)
					.then((url) => {
						const data = { ...formData, image: url };
						if (props.method == "addItem") {
							addItem(data, imgRef);
							setFormData({
								...formData,
								color: "",
								discription: "",
								name: "",
								price: 0,
							});
						} else updateItem(props.update_item, data, imgRef);
						setIsDisabled(false);
					})
					.catch((error) => {
						toast.error(
							"Something is wrong with the image storage"
						);
						console.log(error);
					});
			})
			.catch((error) => {
				toast.error("Something is wrong with the image storage");
				console.log(error);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (image) handleImage(image);
		else {
			if (props.method == "addItem") {
				addItem(formData, null);
				setFormData({
					...formData,
					color: "",
					discription: "",
					name: "",
					price: 0,
				});
			} else updateItem(props.update_item, formData, null);
		}
	};

	useEffect(() => {
		if (!user || !user.is_admin) router.push("/");
	}, [user, router]);

	useEffect(() => {
		if (props.update_item) {
			allItems.map((item) => {
				if (item.id == props.update_item) {
					setFormData({
						color: item.color,
						discription: item.discription,
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
						width={1000}
						height={1000}
						className="mx-auto h-20 w-auto"
						src={logo}
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
					<form
						encType="multipart/form-data"
						className="space-y-6"
						onSubmit={handleSubmit}
					>
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
						<div>
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
									type="file"
									required={props.update_item ? false : true}
									onChange={(e) =>
										setImage(e.target.files[0])
									}
									className="block w-full rounded-md border-0 py-1.5
                                        text-gray-300 shadow-sm ring-1 ring-inset
                                        ring-gray-300 placeholder:text-gray-300
                                        focus:ring-2 focus:ring-inset px-2
                                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							{isDisabled && (
								<div className="text-indigo-500">
									Loading image....
								</div>
							)}
						</div>

						<div>
							<button
								type="submit"
								disabled={isDisabled}
								style={{
									cursor: isDisabled
										? "not-allowed"
										: "pointer",
								}}
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
