import { Box, Container, Unstable_Grid2 as Grid, Typography, alpha } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavBar() {
	const itensNav = [
		{ name: "Início", to: "/" },
		{ name: "Contato", to: "/" },
		{ name: "Pedidos", to: "/" },
	];

	return (
		<Container
			sx={{
				background: "#FEF6F0",
				minWidth: "100%",
				height: "3.2rem",
				display: "flex",
				alignItems: "center",
				borderBottom: (theme) => `1px ${alpha(theme.palette.common.black, 0.1)} solid`,
			}}
		>
			<Grid
				container
				justifyContent={"space-between"}
				alignItems={"center"}
				sx={{ maxWidth: (theme) => theme.breakpoints.values.lg, width: "100%" }}
			>
				<Grid>
					<Link to={""}>ICONE</Link>
				</Grid>
				<Grid container justifyContent={"space-between"}>
					{itensNav.map((item, index) => (
						<Grid sx={{ margin: "0 1rem" }} key={item.name + index}>
							<Link to={item.to}>
								<Typography>{item.name}</Typography>
							</Link>
						</Grid>
					))}
				</Grid>
				<Grid>
					<Link to={""}>E-MAIL</Link>
				</Grid>
			</Grid>
		</Container>
	);
}
