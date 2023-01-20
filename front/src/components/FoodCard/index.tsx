import React, { useState } from "react";
//MUI
import { Unstable_Grid2 as Grid, Typography, IconButton, Box, CardActionArea } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
// REDUX E SAGA
import { itemsDataProps } from "../../store/ducks/items/slice";
// COMPONENTS
import { GridContainer, ImageFood } from "./styles";
import DialogCreateOrUpdateItem from "../Dialog/CreateOrUpdateItem";
interface FoodCardProps {
	item: itemsDataProps;
	imagePath: string;
	canEdit: boolean;
}

export default function FoodCard({ item, canEdit, imagePath }: FoodCardProps) {
	const [openModalEditItem, setOpenModalEditItem] = useState(false);
	const handleClickOpenEditItem = () => {
		setOpenModalEditItem(true);
	};

	const handleCloseEditItem = () => setOpenModalEditItem(false);

	return (
		<Grid sx={{ height: "100%" }}>
			<GridContainer container flexDirection={"row"}>
				<Grid sx={{ padding: "0rem 0.5rem 0" }} xs={imagePath ? 9 : 12}>
					<Typography sx={{ textTransform: "capitalize" }} variant="body2">
						{item.name}
					</Typography>
					<Typography
						variant="caption"
						sx={{
							display: "block",
							// textOverflow: "ellipsis",
							wordWrap: "break-word",
							overflow: "hidden",
							maxHeight: "1.5rem",
							lineHeight: "0.75rem",
						}}
					>
						{item.description}
					</Typography>
					<Grid container justifyContent="space-between" alignItems="center">
						<Grid>
							<Typography
								fontWeight={600}
								sx={{ padding: 0 }}
								variant="caption"
							>{`R$ ${item.price.toFixed(2)}`}</Typography>
						</Grid>
						<Grid>
							{item.avaliable ? null : (
								<Typography variant="body2" sx={{ padding: 0 }} fontSize={12} color="error.main">
									Indisponível
								</Typography>
							)}
						</Grid>
						{/* <Grid>
							<IconButton
								onClick={() => {
									if (canEdit) {
										handleClickOpenEditItem();
									}
								}}
								disabled={!canEdit && !item.avaliable}
							>
								{canEdit ? <EditIcon /> : <AddIcon />}
							</IconButton>
						</Grid> */}
					</Grid>
				</Grid>
				{imagePath ? (
					<Grid xs={3} sx={{ padding: "0.5rem" }}>
						<ImageFood imagePath={imagePath} />
					</Grid>
				) : null}

				{/* <Grid xs={12} sx={{ padding: "0.5rem" }}></Grid> */}
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
