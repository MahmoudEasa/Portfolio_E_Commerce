import { icons } from "../../data";
import Image from "next/image";

const Footer = () => {
	return (
		<footer
			className="flex justify-between items-center flex-wrap
						p-5 bg-gray-500 mt-5 h-full w-full gap-5"
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
		</footer>
	);
};

export default Footer;
