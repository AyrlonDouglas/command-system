import React, { useState } from "react";
//MUI
import {
	Unstable_Grid2 as Grid,
	Typography,
	styled,
	Grid2Props,
	Button,
	IconButton,
	Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
// REDUX E SAGA
import { useAppSelector } from "../../store/hooks";
import { itemsDataProps } from "../../store/ducks/items/slice";
// COMPONENTS
import { GridContainer, ImageFood } from "./styles";
import DialogCreateOrUpdateItem from "../Dialog/CreateOrUpdateItem";
interface FoodCardProps {
	item: itemsDataProps;
	imagePath: string;
	canEdit: boolean;
}

export default function FoodCard({ item, canEdit, ...props }: FoodCardProps) {
	const [openModalEditItem, setOpenModalEditItem] = useState(false);
	const handleClickOpenEditItem = () => {
		setOpenModalEditItem(true);
	};

	const handleCloseEditItem = () => setOpenModalEditItem(false);

	return (
		<Grid sx={{ maxWidth: "1200px" }}>
			<GridContainer container>
				<Grid xs={12} sx={{ padding: "0.5rem" }}>
					<ImageFood src={props.imagePath} alt={item.name} />
				</Grid>
				<Grid sx={{ padding: "0rem 0.5rem 0", width: "100%" }}>
					<Typography sx={{ textTransform: "capitalize" }}>{item.name}</Typography>
					<Grid container justifyContent="space-between" alignItems="center">
						<Grid>
							<Typography fontWeight={600} variant="body2">{`R$ ${item.price.toFixed(
								2
							)}`}</Typography>
							{item.avaliable ? null : (
								<Typography variant="body2" fontSize={12} color="error.main">
									Indisponível
								</Typography>
							)}
						</Grid>
						<Grid>
							<IconButton
								onClick={() => {
									if (canEdit) {
										handleClickOpenEditItem();
									}
								}}
							>
								{canEdit ? <EditIcon /> : <AddIcon />}
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
				<Grid xs={12} sx={{ padding: "0.5rem" }}></Grid>
			</GridContainer>
			<DialogCreateOrUpdateItem
				open={openModalEditItem}
				handleClose={handleCloseEditItem}
				idItem={item.id}
				canEdit
			/>
		</Grid>
	);
}
