import { useEffect, useState } from "react";
//MUI
import { Button, Unstable_Grid2 as Grid } from "@mui/material";
//COMPONENTS
import PageTitle from "../../../components/PageTitle";
import Sidebar from "../../../components/Sidebar";
import FoodCard from "../../../components/FoodCard";
import DialogCreateItem from "../../../components/Dialog/CreateItem";
// REDUX E SAGA
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getItemsRequest } from "../../../store/ducks/items/slice";
// import {} from "../../../assets/images/burguer.jpg"
export default function ItemsList() {
	const dispatch = useAppDispatch();
	const itemsState = useAppSelector((state) => state.items);
	const [openModalCreateItem, setOpenModalCreateItem] = useState(false);

	useEffect(() => {
		dispatch(getItemsRequest());
	}, []);

	const handleClickOpenCreateItem = () => {
		setOpenModalCreateItem(true);
	};
	const handleCloseCreateItem = () => setOpenModalCreateItem(false);

	return (
		<Sidebar>
			<Grid container>
				<Grid xs={12}>
					<PageTitle title="Cardápio" />
				</Grid>
				<Grid xs={12} container justifyContent={"flex-end"}>
					<Grid>
						<Button variant="contained" onClick={handleClickOpenCreateItem}>
							Adicionar Item
						</Button>
					</Grid>
				</Grid>
				<Grid container spacing={2} xs={12} sx={{ marginTop: "1rem" }}>
					{itemsState.data.map((item) => (
						<Grid key={item.name} xs={12} sm={6} md={6} lg={4}>
							<FoodCard
								title={item.name}
								description={item.description}
								imagePath={"/src/assets/images/burger.jpg"}
								imageAlt={item.name}
								price={item.price}
							/>
						</Grid>
					))}
				</Grid>
				<DialogCreateItem open={openModalCreateItem} handleClose={handleCloseCreateItem} />
			</Grid>
		</Sidebar>
	);
}
