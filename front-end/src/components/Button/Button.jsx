"use client";

const Button = (props) => {
	return (
		<button onClick={() => props.func()} className={props.class}>
			{props.name}
		</button>
	);
};

export default Button;
