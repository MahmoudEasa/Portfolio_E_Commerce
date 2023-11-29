import Image from "next/image";

const Home = () => {
	let user = "User";

	if (typeof window !== "undefined") {
		user = JSON.parse(localStorage.getItem("user"));
	}

	const username = user ? user.username : "User";

	console.log(user);
	console.log(username);

	return (
		<div>
			<h1>Landing Page</h1>
			<h1>Hello, {user}</h1>
			<h1>Hello, {username}</h1>
		</div>
	);
};

export default Home;
