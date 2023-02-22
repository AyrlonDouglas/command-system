import { createSlice } from "@reduxjs/toolkit";
import { itemsDataProps } from "../../../helper/interfaces/Item";
import { MainMenuTitleType, SecondaryMenuTitleType } from "../../../helper/interfaces/Layout";

const LayoutSlice = createSlice({
	name: "layout",
	initialState: {
		data: [] as itemsDataProps[],
		loading: false,
		error: false,
		success: true,
		config: {
			menu: {
				menuSelected: "" as MainMenuTitleType,
				subMenuSelected: "" as SecondaryMenuTitleType,
				isMenuPinned: false,
				menuOpen: false,
			},
		},
	},
	reducers: {
		setMenuSelected: (state, action) => {
			state.config.menu.menuSelected = action.payload;
		},
		setSubMenuSelected: (state, action) => {
			state.config.menu.subMenuSelected = action.payload;
		},
		setPinnedMenu: (state, action) => {
			state.config.menu.isMenuPinned = action.payload;
		},
		setMenuOpen: (state, action) => {
			state.config.menu.menuOpen = action.payload;
		},
	},
});

export const { setMenuSelected, setSubMenuSelected, setPinnedMenu, setMenuOpen } =
	LayoutSlice.actions;

export default LayoutSlice.reducer;
