import React, { useState } from "react";
// ROUTER
import { useNavigate } from "react-router-dom";

// MUI
import {
	Unstable_Grid2 as Grid,
	Typography,
	useMediaQuery,
	SwipeableDrawer,
	List,
	ListItem,
	ListItemButton,
} from "@mui/material";
import theme from "../../theme";

// STYLES
import { Nav, ContainerStyle as Container } from "./styles";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Button from "@mui/material/Button";
import { routesApp } from "../../helper/constants/routes";

export default function NavBar() {
	const [openDrawer, setOpenDrawer] = useState(false);
	const match = useMediaQuery(theme().breakpoints.down("md"));
	const navigate = useNavigate();

	const itemsNav = [
		{ name: "Início", to: routesApp.initial.main },
		{ name: "Faça seu pedido", to: routesApp.initial.main },
		{ name: "Acompanhe seu pedido", to: routesApp.initial.main },
		match ? { name: "Entrar", to: routesApp.initial.login } : null,
	];

	const handleOpenDrawer = () => {
		setOpenDrawer(true);
	};

	const closeDrawer = () => {
		setOpenDrawer(false);
	};

	const iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

	return (
		<>
			<Container
				sx={{
					position: match ? "sticky" : "inherit",
					top: 0,
					background: (theme) => theme.palette.background.default,
					zIndex: (theme) => theme.zIndex.drawer,
				}}
			>
				<Nav>
					<Grid
						container
						alignItems={"center"}
						sx={{
							maxWidth: (theme) => theme.breakpoints.values.xl,
							width: "100%",
							justifyContent: { md: "space-around", xs: "space-between" },
						}}
					>
						<Grid
							sx={{ cursor: "pointer" }}
							justifyContent={"center"}
							onClick={() => navigate(routesApp.initial.main)}
						>
							<RestaurantMenuIcon />
						</Grid>
						{match ? (
							<>
								<IconButton onClick={handleOpenDrawer}>
									<MenuIcon />
								</IconButton>
								<SwipeableDrawer
									anchor={"top"}
									open={openDrawer}
									onClose={closeDrawer}
									onOpen={handleOpenDrawer}
									disableBackdropTransition={!iOS}
									disableDiscovery={iOS}
								>
									<List>
										{itemsNav.map((item, index) =>
											item ? (
												<ListItem disablePadding key={item.name + index}>
													<ListItemButton
														sx={{ display: "flex", justifyContent: "center" }}
														onClick={() => navigate(item.to)}
													>
														<Typography
															sx={{
																textAlign: "center",
																color: (theme) =>
																	item.name.toLowerCase() === "entrar"
																		? theme.palette.primary.main
																		: "inherit",
															}}
														>
															{item.name}
														</Typography>
													</ListItemButton>
												</ListItem>
											) : null
										)}
										<ListItem disablePadding>
											<IconButton sx={{ margin: "0 auto" }} onClick={closeDrawer}>
												<CloseIcon fontSize="medium" />
											</IconButton>
										</ListItem>
									</List>
								</SwipeableDrawer>
							</>
						) : (
							<>
								<Grid container justifyContent={"space-between"}>
									{itemsNav.map((item, index) =>
										item ? (
											<Grid sx={{ margin: "0 1rem" }} key={item.name + index}>
												<Typography
													onClick={() => navigate(item.to)}
													sx={{
														":hover": {
															textDecoration: (theme) => `underline ${theme.palette.primary.main}`,
														},
														cursor: "pointer",
														color: (theme) => theme.palette.text.primary,
													}}
												>
													{item.name}
												</Typography>
											</Grid>
										) : null
									)}
								</Grid>
								<Grid>
									<Button onClick={() => navigate("/login")} variant={"outlined"}>
										ENTRAR
									</Button>
								</Grid>
							</>
						)}
					</Grid>
				</Nav>
			</Container>
		</>
	);
}
