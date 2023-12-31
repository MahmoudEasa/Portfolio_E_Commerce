import Image from "next/image";
import Link from "next/link";

const Home = () => {
	return (
		<section className="py-16 flex items-center">
			<div className="h-min mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
					<div>
						<h1 className="text-4xl text-gray-50 font-bold mb-4">
							Welcome to My E-commerce Project
						</h1>
						<p className="text-gray-400 mb-8">
							Shop amazing products and get exclusive offers.
						</p>
						<Link
							href="/items"
							className="bg-indigo-600 hover:bg-indigo-700 rounded
										text-white font-bold py-2 px-4
										focus-visible:outline-indigo-600"
						>
							Start Shopping
						</Link>
					</div>
					<Image
						width={1000}
						height={1000}
						src="/images/landing_page/ecommerce.png"
						alt="Product Image"
						className="rounded-lg w-full h-full"
					/>
				</div>
			</div>
		</section>
	);
};

export default Home;
