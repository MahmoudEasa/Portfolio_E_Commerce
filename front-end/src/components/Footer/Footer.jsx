import { icons } from "../../data";
import Image from "next/image";

const Footer = () => {
	return (
		<footer className="flex items-center p-5 bg-gray-500 mt-5 w-full">
			<div
				className="container flex justify-center items-center
							flex-wrap sm:justify-between gap-5 mx-auto
							max-w-7xl px-2 sm:px-6 lg:px-8"
			>
				<p>&copy; 2023 E-Commerce</p>
				<ul className="flex justify-between gap-5 flex-wrap">
					{icons.map((icon) => (
						<li key={icon.id}>
							<a href={icon.link} target="_blank">
								<Image
									className="hover:opacity-80"
									width={32}
									height={32}
									src={icon.icon}
									alt="icon"
								/>
							</a>
						</li>
					))}
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
