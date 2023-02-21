import { styled } from "@mui/material";

export const ImageFood = styled("img")(({ theme }) => ({
	width: "100%",
	maxHeight: "calc(100vh - 9rem)",
	objectFit: "cover",
	borderRadius: "0.5rem",
	boxShadow: theme.shadows["10"],
	margin: "0 auto",
	[theme.breakpoints.down("sm")]: {
		maxHeight: "calc(100vh - 20rem)",
	},
}));
