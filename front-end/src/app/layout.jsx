import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "E-Commerce",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<UserProvider>
					<Navbar />
					<main className="container mx-auto">{children}</main>
					<Footer />
				</UserProvider>
			</body>
		</html>
	);
}
