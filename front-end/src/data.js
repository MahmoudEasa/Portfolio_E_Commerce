// Initialise Firebase
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCY0s8wik3CN_LBG7WkkjI-pYe3TXL5cjg",
	authDomain: "portfolioecommerce-f1ee6.firebaseapp.com",
	projectId: "portfolioecommerce-f1ee6",
	storageBucket: "portfolioecommerce-f1ee6.appspot.com",
	messagingSenderId: "655056260306",
	appId: "1:655056260306:web:d7cd84b69be7cf4de7710b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);

export const links = [
	{
		id: 1,
		title: "Home",
		url: "/",
	},
	{
		id: 2,
		title: "Products",
		url: "/items",
	},
	{
		id: 3,
		title: "About",
		url: "/about",
	},
];

export const linksProfile = [
	{
		id: 1,
		url: "/profile",
		title: "Your Profile",
	},
	{
		id: 2,
		url: "/orders",
		title: "Your Orders",
	},
];

export const adminLinks = [
	{
		id: 1,
		title: "Add Item",
		url: "/add_item",
	},
	{
		id: 2,
		title: "All Items",
		url: "/items",
	},
];

export const icons = [
	{
		id: 1,
		icon: "/images/icons/linkedin.png",
		link: "https://www.linkedin.com/in/mahmoudeasa/",
	},
	{
		id: 2,
		icon: "/images/icons/github.png",
		link: "https://github.com/MahmoudEasa",
	},
	{
		id: 3,
		icon: "/images/icons/gmail.png",
		link: "mailto:mu01011422865@gmail.com",
	},
	{
		id: 4,
		icon: "/images/icons/facebook.png",
		link: "https://web.facebook.com/profile.php?id=100000227028947",
	},
];

export const url = process.env.NEXT_PUBLIC_URL;
