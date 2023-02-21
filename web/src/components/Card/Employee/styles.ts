import { styled, Unstable_Grid2 as Grid } from "@mui/material";

export const GridContainer = styled(Grid)(({ theme }) => ({
	background: theme.palette.background.paper,
	borderRadius: theme.shape.borderRadius,
	height: "4rem ",
}));
