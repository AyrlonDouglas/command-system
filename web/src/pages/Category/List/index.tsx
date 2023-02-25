import React, { useState, useEffect } from "react";
//MUI
import {
	Unstable_Grid2 as Grid,
	Button,
	Paper,
	Divider,
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";
//componentes
import PageTitle from "../../../components/common/PageTitle";
import InputSearch from "../../../components/Input/Search";
import ListEmpty from "../../../components/common/listEmpty";
import DialogCreateOrEditCategory from "../../../components/Dialog/CreateOrUpdateCategory";
//redux
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCategoriesRequest } from "../../../store/ducks/categories/slice";

export default function CategoryList() {
	const [search, setSearch] = useState("");
	const [openCreateEdit, setOpenCreateEdit] = useState(false);
	const [categoryId, setCategoryId] = useState<number | null>(null);
	const disptach = useAppDispatch();

	const categoriesState = useAppSelector((state) => state.categories);

	const handleSearch = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearch(e.target.value);
	};
	const handleOpenCreate = (type: "create" | "edit") => {
		if (type === "create") {
			setCategoryId(null);
		}

		setOpenCreateEdit(true);
	};
	const filterByCategory = (category: (typeof categoriesState.data)[0]) => {
		if (!search) {
			return true;
		}

		return category.name.toLowerCase().includes(search.toLowerCase());
	};
	const closeCreateEditCategory = () => setOpenCreateEdit(false);

	useEffect(() => {
		disptach(getCategoriesRequest());
	}, []);

	return (
		<Grid container spacing={2}>
			<Grid xs={12}>
				<PageTitle title="Categorias" />
			</Grid>

			<Grid xs={12} container spacing={1} justifyContent={"space-between"}>
				<Grid xs={12} sm={5} md={4}>
					<InputSearch onChange={handleSearch} value={search} />
				</Grid>
				<Grid xs={12} sm={5} md={4}>
					<Button variant="contained" onClick={() => handleOpenCreate("create")} fullWidth>
						Adicionar Categoria
					</Button>
				</Grid>
			</Grid>

			<Grid xs={12}>
				<ListEmpty
					dataList={categoriesState.data}
					label="Categorias"
					action={() => handleOpenCreate("create")}
				/>
				<Paper>
					<List>
						{categoriesState.data.filter(filterByCategory).map((category, index, arrOrign) => (
							<Box key={category.id}>
								<ListItem disablePadding>
									<ListItemButton
										onClick={() => {
											handleOpenCreate("edit");
											setCategoryId(category.id);
										}}
									>
										<ListItemText primary={category.name} />
									</ListItemButton>
								</ListItem>
								{arrOrign.length - 1 !== index ? <Divider /> : null}
							</Box>
						))}
					</List>
				</Paper>
			</Grid>
			<DialogCreateOrEditCategory
				open={openCreateEdit}
				handleClose={closeCreateEditCategory}
				categoryId={categoryId}
			/>
		</Grid>
	);
}
