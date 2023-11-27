import AddItemComponent from "@/components/AddItemComponent/AddItemComponent";

const UpdateItem = ({ params }) => {
	return (
		<AddItemComponent
			method={"updateItem"}
			update_item={params.update_item}
		/>
	);
};

export default UpdateItem;
