import { useEffect, useState } from "react";
//MUI
import { Button, Unstable_Grid2 as Grid, Divider, Typography } from "@mui/material";

//COMPONENTS
import PageTitle from "../../../components/common/PageTitle";
import CardFood from "../../../components/Card/Food";
import DialogCreateOrUpdateItem from "../../../components/Dialog/CreateOrUpdateItem";
import InputSearch from "../../../components/Input/Search";
// REDUX E SAGA
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getItemsRequest } from "../../../store/ducks/items/slice";
import { getCategoriesRequest } from "../../../store/ducks/categories/slice";
//IMAGE
import ImageDefault from "../../../assets/images/cutlery.jpg";
import DialogViewCategories from "../../../components/Dialog/ViewCategories";
import ListEmpty from "../../../components/common/listEmpty";
import { itemsDataProps } from "../../../helper/interfaces/Item";
// interface

export default function ItemsList() {
	const dispatch = useAppDispatch();
	const itemsState = useAppSelector((state) => state.items);
	const [openModalCreateItem, setOpenModalCreateItem] = useState(false);
	const [openModalViewCategories, setOpenModalViewCategories] = useState(false);
	const [openModalEditItem, setOpenModalEditItem] = useState(false);
	const [itemIdSelected, setItemIdSelected] = useState(-1);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		dispatch(getItemsRequest());
		dispatch(getCategoriesRequest());
	}, []);

	const onChangeFilter = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	const handleFilterItems = (item: typeof itemsState.data[0]) => {
		if (!filter) {
			return true;
		}

		return (
			item.category.name.toLowerCase().includes(filter.toLowerCase()) ||
			item.description.toLowerCase().includes(filter.toLowerCase()) ||
			item.name.toLowerCase().includes(filter.toLowerCase()) ||
			item.price.toString().toLowerCase().includes(filter.toLowerCase())
		);
	};

	const handleCloseCreateItem = () => setOpenModalCreateItem(false);
	const handleClickOpenCreateItem = () => setOpenModalCreateItem(true);

	const handleCloseEditItem = () => setOpenModalEditItem(false);
	const handleClickOpenEditItem = () => setOpenModalEditItem(true);

	const handleCloseViewCategories = () => setOpenModalViewCategories(false);
	const handleOpenViewCategories = () => setOpenModalViewCategories(true);

	const groupItemsByCategory = (items: itemsDataProps[]) => {
		interface groupedItemsProps {
			name: string;
			items: itemsDataProps[];
		}

		const itemsGrouped: groupedItemsProps[] = [];

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
	const onClickCard = (itemId: number) => {
		handleClickOpenEditItem();
		setItemIdSelected(itemId);
	};
	return (
		<>
			<Grid container>
				<Grid xs={12}>
					<PageTitle title="Cardápio" />
				</Grid>
				<Grid xs={12} container spacing={1} justifyContent={"space-between"}>
					<Grid xs={12} sm={4}>
						<InputSearch
							placeholder="comida mexicana etc"
							value={filter}
							onChange={onChangeFilter}
						/>
					</Grid>
					<Grid xs={12} sm={4}>
						<Button variant="contained" onClick={handleClickOpenCreateItem} fullWidth>
							Adicionar Item
						</Button>
					</Grid>
					<Grid xs={12} sm={4}>
						<Button variant="contained" onClick={handleOpenViewCategories} fullWidth>
							Categorias
						</Button>
					</Grid>
				</Grid>
				<Grid container xs={12} spacing={1} sx={{ marginTop: "1rem" }}>
					<ListEmpty label="items" action={handleClickOpenCreateItem} dataList={itemsState.data} />
					{groupItemsByCategory(itemsState.data.filter(handleFilterItems)).map((itemByCategory) => {
						return (
							<Grid container xs={12} key={itemByCategory.name}>
								<Grid xs={12}>
									<Typography textTransform={"capitalize"} fontWeight={700} align="center">
										{itemByCategory.name}
									</Typography>
									<Divider />
								</Grid>
								{itemByCategory.items.map((item) => (
									<Grid key={item.id} xs={12} sm={6} md={4}>
										<CardFood
											item={item}
											imagePath={ImageDefault}
											key={item.name}
											canEdit
											onClick={onClickCard}
										/>
									</Grid>
								))}
							</Grid>
						);
					})}
				</Grid>
				<DialogCreateOrUpdateItem
					open={openModalEditItem}
					handleClose={handleCloseEditItem}
					idItem={itemIdSelected}
					canEdit
				/>
			</Grid>
			<DialogCreateOrUpdateItem open={openModalCreateItem} handleClose={handleCloseCreateItem} />
			<DialogViewCategories
				open={openModalViewCategories}
				handleClose={handleCloseViewCategories}
			/>
		</>
	);
}
