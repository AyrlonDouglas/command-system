import { useState } from "react";
//MUI
import { Unstable_Grid2 as Grid, Typography, CardActionArea } from "@mui/material";

// COMPONENTS
import { GridContainer, ImageFood } from "./styles";
import DialogCreateOrUpdateItem from "../../Dialog/CreateOrUpdateItem";
// interface
import { ItemsDataProps } from "../../../helper/interfaces/Item";
interface CardFoodProps {
	item: ItemsDataProps;
	canEdit: boolean;
	onClick: (id: number) => void;
}

export default function CardFood({ item, onClick }: CardFoodProps) {
	const [openModalEditItem, setOpenModalEditItem] = useState(false);

	const handleCloseEditItem = () => setOpenModalEditItem(false);

	return (
		<CardActionArea
			sx={{ borderRadius: "0.25rem", height: "100%" }}
			onClick={() => {
				onClick(item.id);
			}}
		>
			<Grid sx={{ height: "100%" }}>
				<GridContainer container flexDirection={"row"}>
					<Grid sx={{ padding: "0rem 0.5rem 0" }} xs={item.imageUrl ? 9 : 12}>
						<Typography sx={{ textTransform: "capitalize" }} variant="body2">
							{item.name}
						</Typography>
						<Typography
							variant="caption"
							sx={{
								display: "block",
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
								>{`R$ ${+item.price?.toFixed(2)}`}</Typography>
							</Grid>
							<Grid>
								{item.avaliable ? null : (
									<Typography variant="body2" sx={{ padding: 0 }} fontSize={12} color="error.main">
										Indisponível
									</Typography>
								)}
							</Grid>
						</Grid>
					</Grid>
					<Grid xs={3} sx={{ padding: 0 }}>
						{item.imageUrl && (
							<ImageFood imagepath={`${import.meta.env.VITE_HOST_URL}/${item.imageUrl}`} />
						)}
					</Grid>
				</GridContainer>

				<DialogCreateOrUpdateItem
					open={openModalEditItem}
					handleClose={handleCloseEditItem}
					idItem={item.id}
				/>
			</Grid>
		</CardActionArea>
	);
}
