import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { UserProvider } from "@/context/UserContext";
import { CartProvider } from "@/context/CartContext";
import { ItemProvider } from "@/context/ItemContext";
import { OrderProvider } from "@/context/OrderContext";
import Cart from "@/components/Cart/Cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "E-Commerce",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-black`}>
				<UserProvider>
					<CartProvider>
						<ItemProvider>
							<OrderProvider>
								<ToastContainer />
								<Navbar />
								<Cart />
								<main
									className="container bg-black
													mx-auto min-h-min"
								>
									{children}
								</main>
								<Footer />
							</OrderProvider>
						</ItemProvider>
					</CartProvider>
				</UserProvider>
			</body>
		</html>
	);
}
