import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
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
	Collapse,
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
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
// storage
import { LOCAL } from "../../helper/constants/localStorage";
// const
import { SecondaryMenu } from "../../helper/constants/layout";
import {
	MainMenuProps,
	MainMenuTitleType,
	SecondaryMenuTitleType,
} from "../../helper/interfaces/Layout";
// redux
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
	setFixedMenu,
	setMenuOpen,
	setMenuSelected,
	setSubMenuSelected,
} from "../../store/ducks/layout/slice";
import { recoverLoginRequest } from "../../store/ducks/login/slice";

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

const MainMenu: MainMenuProps[] = [
	{ title: "Comandas", icon: <DashboardIcon color="primary" /> },
	{ title: "Pedidos", icon: <SoupKitchenIcon color="primary" /> },
	{ title: "Cardápio", icon: <MenuBookIcon color="primary" /> },
	{ title: "Usuários", icon: <HailIcon color="primary" /> },
];

const BottomMenu: MainMenuProps[] = [
	{ title: "Configurações", icon: <SettingsApplicationsIcon color="primary" /> },
	{ title: "sair", icon: <LogoutIcon color="primary" /> },
];

interface IMiniDrawer {
	children?: JSX.Element;
}
function MiniDrawer({ children }: IMiniDrawer) {
	const [openModal, setOpenModal] = useState(false);
	const layoutState = useAppSelector((state) => state.layout);
	const loginState = useAppSelector((state) => state.login);
	const open = useAppSelector((state) => state.layout.config.menu.menuOpen);
	const token = localStorage.getItem(LOCAL.token);
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		token && dispatch(recoverLoginRequest());
	}, [layoutState.config.menu.subMenuSelected]);

	const onFixedMenu = () => {
		dispatch(setFixedMenu(!layoutState.config.menu.fixedMenu));
	};

	const onMouse = (type: "enter" | "leave") => {
		if (layoutState.config.menu.fixedMenu) {
			return;
		}

		if (type === "enter") {
			dispatch(setMenuOpen(true));
		}

		if (type === "leave" && !loginState.loading) {
			dispatch(setMenuOpen(false));
		}
	};

	const handleOpenModal = () => {
		setOpenModal((state) => !state);
	};
	const handleExpandIcon = (matched: boolean, itemTitle: MainMenuTitleType) =>
		open &&
		itemTitle !== "sair" &&
		(matched ? (
			<ExpandLess fontSize="small" color="primary" />
		) : (
			<ExpandMore fontSize="small" color="primary" />
		));

	const listItems = (item: MainMenuProps, index: number) => {
		const listSubMenus = SecondaryMenu.filter(({ section, permissionsToAcces }) => {
			if (section !== item.title) {
				return false;
			}

			if (!permissionsToAcces.length) {
				return true;
			}

			return permissionsToAcces.every(({ entity, action }) =>
				loginState.data.permissions?.some(
					({ entity: e, action: a }) => e === entity && a === action
				)
			);
		});

		const render = listSubMenus.length || item.title === "sair";

		const isMenuMatched = layoutState.config.menu.menuSelected === item.title;

		return (
			<>
				{render ? (
					<>
						{index === 0 ? <Divider /> : null}

						<ListItem key={item.title} disablePadding sx={{ display: "block" }}>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5,
								}}
								onClick={() => onClickMainMenu(item.title)}
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
								<ListItemText
									primary={item.title}
									sx={{ opacity: open ? 1 : 0, fontSize: (theme) => theme.typography.h1 }}
								/>
								{handleExpandIcon(isMenuMatched, item.title)}
							</ListItemButton>
						</ListItem>
						{open &&
							listSubMenus.map((subMenu) => {
								const isSubMenuMatched = layoutState.config.menu.subMenuSelected === subMenu.title;
								return (
									<Collapse
										in={layoutState.config.menu.menuSelected === subMenu.section}
										timeout="auto"
										unmountOnExit
										key={subMenu.title}
									>
										<ListItem
											disablePadding
											sx={{
												display: "block",
												background: (theme) => theme.palette.background.default,
											}}
										>
											<ListItemButton
												sx={{
													minHeight: 48,
													justifyContent: open ? "initial" : "center",
													px: 2.5,
													paddingLeft: 10,
												}}
												onClick={() => onClickSubMenu(subMenu.title, subMenu.path)}
											>
												<ListItemText
													primary={subMenu.title}
													sx={{
														opacity: open ? 1 : 0,
														"& span": {
															fontSize: (theme) => theme.typography.body2.fontSize,
															color: (theme) =>
																isSubMenuMatched ? theme.palette.primary.main : "initial",
														},
													}}
												/>
											</ListItemButton>
										</ListItem>
									</Collapse>
								);
							})}
						{open ? <Divider /> : null}
					</>
				) : null}
			</>
		);
	};
	const onClickMainMenu = (menuTitle: MainMenuTitleType) => {
		if (menuTitle === "sair") {
			handleOpenModal();
			return;
		}

		if (layoutState.config.menu.menuSelected === menuTitle) {
			dispatch(setMenuSelected(""));
		} else {
			dispatch(setMenuSelected(menuTitle));
		}
	};
	const onClickSubMenu = (subMenuTitle: SecondaryMenuTitleType, path: string) => {
		dispatch(setSubMenuSelected(subMenuTitle));
		navigate(path);
		dispatch(setMenuOpen(true));
	};

	return (
		<>
			{token ? (
				<Box component={"nav"} sx={{ display: "flex" }}>
					<Drawer
						variant="permanent"
						open={open}
						onMouseEnter={() => onMouse("enter")}
						onMouseLeave={() => onMouse("leave")}
					>
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
							<IconButton onClick={onFixedMenu}>
								{layoutState.config.menu.fixedMenu ? (
									<ChevronLeftIcon color="primary" />
								) : (
									<ChevronRightIcon color="primary" />
								)}
							</IconButton>
						</DrawerHeader>
						<List sx={{ paddingTop: 0 }}>
							{MainMenu.map((item, index) => listItems(item, index))}
						</List>
						<List
							sx={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-end",
							}}
						>
							{BottomMenu.map((item, index) => listItems(item, index))}
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
