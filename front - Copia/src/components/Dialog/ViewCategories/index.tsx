import { useEffect, useState } from "react";

// components
import {
	DialogTitle,
	DialogContent,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Box,
	TextField,
	InputAdornment,
	IconButton,
	Button,
	Typography,
} from "@mui/material";
// icons
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
// redux
import { useAppSelector } from "../../../store/hooks";
// styles
import { DialogStyled as Dialog } from "./styles";
import DialogCreateOrEditCategory from "../CreateOrUpdateCategory";
import ListEmpty from "../../common/listEmpty";
import InputSearch from "../../Input/Search";

interface DialogViewCategoriesProps {
	open: boolean;
	handleClose: () => void;
}

export default function DialogViewCategories({ open, handleClose }: DialogViewCategoriesProps) {
	const categoriesState = useAppSelector((state) => state.categories);
	const [search, setSearch] = useState("");
	const [openCreateCategory, setOpenCreateCategory] = useState(false);
	const [openUpdateCategory, setOpenUpdateCategory] = useState(false);
	const [categoryId, setCategoryId] = useState(-1);

	const handleCloseCreateCategory = () => {
		setOpenCreateCategory(false);
	};
	const handleOpenCreateCategory = () => {
		setOpenCreateCategory(true);
	};
	const handleCloseUpdateCategory = () => {
		setOpenUpdateCategory(false);
	};
	const handleOpenUpdateCategory = () => {
		setOpenUpdateCategory(true);
	};

	const onClose = () => {
		handleClose();
		// reset();
	};

	const filterByCategory = (category: typeof categoriesState.data[0]) => {
		if (!search) {
			return true;
		}

		return category.name.toLowerCase().includes(search.toLowerCase());
	};

	const GenerateList = () => {
		if (categoriesState.data.length === 0 && categoriesState.error) {
			return <Typography>Ocorreu algum erro ao listar as categorias.</Typography>;
		}

		return (
			<List>
				{categoriesState.data.filter(filterByCategory).map((category) => (
					<ListItem disablePadding key={category.id}>
						<ListItemButton
							onClick={() => {
								handleOpenUpdateCategory();
								setCategoryId(category.id);
							}}
						>
							<ListItemText primary={category.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		);
	};

	const onChangeSearch = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<>
			<Dialog open={open} onClose={onClose}>
				<DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
					Categorias
					<Button
						endIcon={<AddIcon />}
						sx={{ marginRight: "24px" }}
						onClick={handleOpenCreateCategory}
					>
						Adicionar
					</Button>
				</DialogTitle>

				<DialogContent>
					<Box sx={{ marginTop: "4px" }}>
						<InputSearch onChange={onChangeSearch} value={search} placeholder="Categoria" />
					</Box>
					<ListEmpty
						label="categorias"
						dataList={categoriesState.data}
						action={handleOpenCreateCategory}
					/>
					<GenerateList />
				</DialogContent>
			</Dialog>
			<DialogCreateOrEditCategory
				open={openCreateCategory}
				handleClose={handleCloseCreateCategory}
			/>
			<DialogCreateOrEditCategory
				open={openUpdateCategory}
				handleClose={handleCloseUpdateCategory}
				categoryId={categoryId}
				canEdit
			/>
		</>
	);
}
