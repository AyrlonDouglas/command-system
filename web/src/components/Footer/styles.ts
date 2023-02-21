import { styled } from "@mui/system";

export const TypographyStyled = styled("span")(({ theme }) => ({
	":hover": {
		textDecoration: `underline ${theme.palette.primary.main}`,
	},
	cursor: "pointer",
	color: theme.palette.text.primary,
	display: "inline-block",
}));
