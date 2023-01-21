import React, { useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
// MUI
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
	Box,
	Drawer as MuiDrawer,
	List,
	Typography,
	Divider,
	IconButton,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Container,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	useMediaQuery,
} from "@mui/material";
// components
import DialogLogout from "../Dialog/Logout";
// icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HailIcon from "@mui/icons-material/Hail";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
// storage
import { LOCAL } from "../../helper/constants/localStorage";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
	background: theme.palette.background.paper,
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	background: theme.palette.background.paper,
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

interface IMiniDrawer {
	children?: JSX.Element;
}
function MiniDrawer({ children }: IMiniDrawer) {
	const token = localStorage.getItem(LOCAL.token);
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const navigate = useNavigate();

	const handleDrawer = () => {
		setOpen((state) => !state);
	};

	const itemsMenu = [
		{
			text: "Pedidos",
			icon: <SoupKitchenIcon color="primary" />,
			action: () => navigate("/orders/management"),
		},
		{
			text: "Comandas",
			icon: <DashboardIcon color="primary" />,
			action: () => navigate("/orders/management"),
		},
		{
			text: "Profissionais",
			icon: <HailIcon color="primary" />,
			action: () => navigate("/employees/list"),
		},
		{
			text: "Cardápio",
			icon: <MenuBookIcon color="primary" />,
			action: () => navigate("/items/list"),
		},
	];

	const secondaryItemsMenu = [
		{
			text: "Configurações",
			icon: <SettingsApplicationsIcon color="primary" />,
			action: () => navigate("/settings"),
		},
		{
			text: "Sair",
			icon: <LogoutIcon color="primary" />,
			action: () => handleOpenModal(),
		},
	];

	const handleOpenModal = () => {
		setOpenModal((state) => !state);
	};
	return (
		<>
			{token ? (
				<Box component={"nav"} sx={{ display: "flex" }}>
					<Drawer variant="permanent" open={open}>
						<DrawerHeader sx={{ justifyContent: "center", gap: 1 }}>
							{open && (
								<Typography fontWeight={"bold "}>
									COMMAND
									<Box
										component="span"
										sx={{
											color: (theme) => theme.palette.primary.main,
											fontWeight: "900",
										}}
									>
										SYSTEM
									</Box>
								</Typography>
							)}
							<IconButton onClick={handleDrawer}>
								{open ? <ChevronLeftIcon color="primary" /> : <ChevronRightIcon color="primary" />}
							</IconButton>
						</DrawerHeader>
						<Divider />
						<List>
							{itemsMenu.map((item, index) => (
								<ListItem key={item.text} disablePadding sx={{ display: "block" }}>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open ? "initial" : "center",
											px: 2.5,
										}}
										onClick={item.action}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 3 : "auto",
												justifyContent: "center",
											}}
										>
											{item.icon}
										</ListItemIcon>
										<ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
									</ListItemButton>
								</ListItem>
							))}
						</List>
						<Divider />
						<List
							sx={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-end",
							}}
						>
							{secondaryItemsMenu.map((item, index) => (
								<ListItem key={item.text} disablePadding sx={{ display: "block" }}>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open ? "initial" : "center",
											px: 2.5,
										}}
										onClick={item.action}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 3 : "auto",
												justifyContent: "center",
											}}
										>
											{item.icon}
										</ListItemIcon>
										<ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
									</ListItemButton>
								</ListItem>
							))}
						</List>
					</Drawer>
					<Container
						sx={{
							width: !open
								? `calc(100% - ${theme.spacing(7)} - 1px)`
								: `calc(100% - ${drawerWidth}px) !important`,
						}}
					>
						<Box
							component="main"
							sx={{
								flexGrow: 1,
								pt: 3,
								pb: 3,
							}}
						>
							{children}
						</Box>
					</Container>
				</Box>
			) : (
				children
			)}

			<DialogLogout open={openModal} onClose={handleOpenModal} />
		</>
	);
}

export default React.memo(MiniDrawer);
