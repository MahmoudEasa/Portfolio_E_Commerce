import Link from "next/link";
import { links } from "../Navbar/data";

const Footer = () => {
	return (
		<footer
			className="flex justify-center items-center
						p-5 bg-gray-500 mt-5 h-14 w-full"
		>
			<ul className="flex justify-between gap-5">
				{links.map((link) => (
					<li key={link.id}>
						<Link href={link.url}>{link.title}</Link>
					</li>
				))}
			</ul>
		</footer>
	);
};

export default Footer;
