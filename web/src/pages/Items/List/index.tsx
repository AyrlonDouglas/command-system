import { useEffect, useState } from "react";
//MUI
import { Button, Unstable_Grid2 as Grid, Divider, Typography } from "@mui/material";

//COMPONENTS
import PageTitle from "../../../components/common/PageTitle";
import CardFood from "../../../components/Card/Food";
import DialogCreateOrUpdateItem from "../../../components/Dialog/CreateOrUpdateItem";
import InputSearch from "../../../components/Input/Search";
import Page from "../../../components/common/Layout/Page";
// REDUX E SAGA
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getItemsRequest } from "../../../store/ducks/items/slice";
import { getCategoriesRequest } from "../../../store/ducks/categories/slice";
//IMAGE
import ImageDefault from "../../../assets/images/cutlery.jpg";
import ListEmpty from "../../../components/common/listEmpty";
import { ItemsDataProps } from "../../../helper/interfaces/Item";
// interface

export default function ItemsList() {
	const dispatch = useAppDispatch();
	const itemsState = useAppSelector((state) => state.items);
	const [openCreateEditItem, setOpenCreateEditItem] = useState(false);
	const [itemIdSelected, setItemIdSelected] = useState<null | number>(null);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		dispatch(getItemsRequest());
		dispatch(getCategoriesRequest());
	}, []);

	const onChangeFilter = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	const handleFilterItems = (item: (typeof itemsState.data)[0]) => {
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

	const closeCreateEditItem = () => setOpenCreateEditItem(false);
	const handleOpenCreateEditItem = (type: "create" | "edit") => {
		if (type === "create") {
			setItemIdSelected(null);
		}
		setOpenCreateEditItem(true);
	};

	const groupItemsByCategory = (items: ItemsDataProps[]) => {
		interface groupedItemsProps {
			name: string;
			items: ItemsDataProps[];
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
		handleOpenCreateEditItem("edit");
		setItemIdSelected(itemId);
	};
	return (
		<>
			<Page.Page>
				<Page.Title title="Cardápio" />

				<Page.Content container justifyContent={"space-between"}>
					<Grid xs={12} sm={5} md={4}>
						<InputSearch
							placeholder="comida mexicana etc"
							value={filter}
							onChange={onChangeFilter}
						/>
					</Grid>
					<Grid xs={12} sm={5} md={4}>
						<Button
							variant="contained"
							onClick={() => handleOpenCreateEditItem("create")}
							fullWidth
						>
							Adicionar Item
						</Button>
					</Grid>
				</Page.Content>

				<Page.Content>
					<ListEmpty
						label="itens"
						action={() => handleOpenCreateEditItem("create")}
						dataList={itemsState.data}
					/>
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
				</Page.Content>

				<DialogCreateOrUpdateItem
					open={openCreateEditItem}
					handleClose={closeCreateEditItem}
					idItem={itemIdSelected}
				/>
			</Page.Page>
		</>
	);
}
