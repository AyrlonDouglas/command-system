import { styled, Grid2Props, Unstable_Grid2 as Grid } from "@mui/material";

export const ImageFood = styled("img")<Grid2Props>(({ theme }) => ({
	width: "100%",
	maxHeight: "10rem",
	borderRadius: "0.25rem",
	objectFit: "cover",
	aspectRatio: "10 / 5",
}));

export const GridContainer = styled(Grid)(({ theme }) => ({
	background: theme.palette.background.paper,
	borderRadius: theme.shape.borderRadius,
}));
