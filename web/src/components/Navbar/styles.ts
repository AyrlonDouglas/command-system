import { Container, ContainerProps, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Nav = styled("nav")(({ theme }) => ({
	width: "100%",
}));

export const ContainerStyle = styled(Container)<ContainerProps>(({ theme }) => ({
	minWidth: "100%",
	height: "3.2rem",
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	borderBottom: `1px ${alpha(theme.palette.common.black, 0.1)} solid`,
}));
