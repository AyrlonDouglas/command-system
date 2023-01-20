import { useEffect, useState } from "react";
//MUI
import {
	Button,
	Unstable_Grid2 as Grid,
	Divider,
	Typography,
	TextField,
	InputAdornment,
	CardActionArea,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

//COMPONENTS
import PageTitle from "../../../components/PageTitle";
import FoodCard from "../../../components/FoodCard";
import DialogCreateOrUpdateItem from "../../../components/Dialog/CreateOrUpdateItem";
// REDUX E SAGA
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getItemsRequest, itemsDataProps } from "../../../store/ducks/items/slice";
import { getCategoriesRequest } from "../../../store/ducks/categories/slice";
//IMAGE
import ImageDefault from "../../../assets/images/cutlery.jpg";
import DialogViewCategories from "../../../components/Dialog/ViewCategories";

export default function ItemsList() {
	const dispatch = useAppDispatch();
	const itemsState = useAppSelector((state) => state.items);
	const [openModalCreateItem, setOpenModalCreateItem] = useState(false);
	const [openModalViewCategories, setOpenModalViewCategories] = useState(false);
	const [openModalEditItem, setOpenModalEditItem] = useState(false);
	const [itemIdSelected, setItemIdSelected] = useState(-1);
	const [filter, setFilter] = useState("");
	const [itemsFiltered, setItemsFiltered] = useState<typeof itemsState.data>([]);

	useEffect(() => {
		dispatch(getItemsRequest());
		dispatch(getCategoriesRequest());
	}, []);

	const handleClickOpenCreateItem = () => {
		setOpenModalCreateItem(true);
	};

	const handleClickOpenEditItem = () => {
		setOpenModalEditItem(true);
	};

	const handleCloseEditItem = () => setOpenModalEditItem(false);

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

	const handleOpenViewCategories = () => setOpenModalViewCategories(true);
	const handleCloseViewCategories = () => setOpenModalViewCategories(false);

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

	return (
		<Grid container>
			<Grid xs={12}>
				<PageTitle title="Cardápio" />
			</Grid>
			<Grid xs={12} container spacing={1} justifyContent={"space-between"}>
				<Grid xs={12} sm={4}>
					<TextField
						label="Pesquise aqui"
						placeholder="comida mexicana etc"
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
						size="small"
						variant="outlined"
						fullWidth
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
				{groupItemsByCategory(itemsState.data.filter(handleFilterItems)).map((itemByCategory) => {
					return (
						<>
							<Grid xs={12}>
								<Typography textTransform={"capitalize"} fontWeight={700} align="center">
									{itemByCategory.name}
								</Typography>
								<Divider />
							</Grid>
							{itemByCategory.items.map((item, index) => (
								<Grid key={item.id} xs={12} sm={6} md={4}>
									<CardActionArea
										sx={{ borderRadius: "0.25rem", height: "100%" }}
										onClick={() => {
											handleClickOpenEditItem();
											setItemIdSelected(item.id);
										}}
									>
										<FoodCard item={item} imagePath={ImageDefault} key={item.name} canEdit />
									</CardActionArea>
								</Grid>
							))}
						</>
					);
				})}
			</Grid>
			<DialogCreateOrUpdateItem
				open={openModalEditItem}
				handleClose={handleCloseEditItem}
				idItem={itemIdSelected}
				canEdit
			/>
			<DialogCreateOrUpdateItem open={openModalCreateItem} handleClose={handleCloseCreateItem} />
			<DialogViewCategories
				open={openModalViewCategories}
				handleClose={handleCloseViewCategories}
			/>
		</Grid>
	);
}
