import { useEffect, useState } from "react";
//MUI
import { Button, Unstable_Grid2 as Grid, Divider, Typography } from "@mui/material";
//COMPONENTS
import PageTitle from "../../../components/PageTitle";
import Sidebar from "../../../components/Sidebar";
import FoodCard from "../../../components/FoodCard";
import DialogCreateItem from "../../../components/Dialog/CreateOrUpdateItem";
// REDUX E SAGA
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getItemsRequest, itemsDataProps } from "../../../store/ducks/items/slice";
//IMAGE
import ImageDefault from "../../../assets/images/cutlery.jpg";

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

	const groupItemsByCategory = (items: itemsDataProps[]) => {
		interface dataProps {
			name: string;
			items: itemsDataProps[];
		}

		const itemsGrouped: dataProps[] = [];

		items.forEach((item) => {
			let hasExistCategory = false;
			itemsGrouped.forEach((itemGrouped) => {
				if (itemGrouped.name === item.category.name) {
					hasExistCategory = true;
					itemGrouped.items.push(item);
				}
			});

			if (!hasExistCategory) {
				itemsGrouped.push({ name: item.category.name, items: [item] });
			}
		});

		return itemsGrouped;
	};

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
				<Grid container xs={12} spacing={1} sx={{ marginTop: "1rem" }}>
					{itemsState.data.length === 0 ? (
						<Typography>
							Não existe nenhum item cadastrado,{" "}
							<Typography
								onClick={handleClickOpenCreateItem}
								component={"span"}
								color="primary"
								sx={{ ":hover": { textDecoration: "underline" }, cursor: "pointer" }}
							>
								acidione aqui.
							</Typography>
						</Typography>
					) : null}
					{groupItemsByCategory(itemsState.data).map((itemByCategory) => {
						return (
							<>
								<Grid xs={12}>
									<Typography textTransform={"capitalize"} fontWeight={700} align="center">
										{itemByCategory.name}
									</Typography>
									<Divider />
								</Grid>
								{itemByCategory.items.map((item) => (
									<Grid key={item.id} xs={12} sm={6} md={4}>
										<FoodCard item={item} imagePath={ImageDefault} key={item.name} canEdit />
									</Grid>
								))}
							</>
						);
					})}
				</Grid>
				<DialogCreateItem open={openModalCreateItem} handleClose={handleCloseCreateItem} />
			</Grid>
		</Sidebar>
	);
}
