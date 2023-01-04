import { styled } from "@mui/material/styles";

export const ColorRed = styled("span")(({ theme }) => ({ color: theme.palette.primary.main }));

export const ImageFood = styled("img")(({ theme }) => ({
	width: "10rem",
	height: "10rem",
	objectFit: "cover",
	borderRadius: "100%",
	boxShadow: theme.shadows["10"],
}));
