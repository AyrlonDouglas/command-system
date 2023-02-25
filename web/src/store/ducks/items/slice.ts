import { createSlice } from "@reduxjs/toolkit";
import { itemsDataProps } from "../../../helper/interfaces/Item";

const itemsSlice = createSlice({
	name: "items",
	initialState: {
		data: [] as itemsDataProps[],
		loading: false,
		error: false,
	},
	reducers: {
		getItemsRequest: (state) => {
			state.loading = true;
		},
		getItemsSuccess: (state, action) => {
			state.loading = false;
			state.error = false;

			state.data = action.payload;
		},
		createItemRequest: (state, action) => {
			state.loading = true;
		},
		createItemSuccess: (state, action) => {
			state.loading = false;
			state.error = false;

			state.data = [...state.data, action.payload];
		},
		updateItemRequest: (state, action) => {
			state.loading = true;
		},
		updateItemSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.data = state.data.map((item) =>
				item.id === action.payload.id ? action.payload : item
			);
		},
		genericItemFail: (state) => {
			state.loading = false;
			state.error = true;
		},
	},
});

export const {
	getItemsRequest,
	getItemsSuccess,
	createItemRequest,
	createItemSuccess,
	updateItemRequest,
	updateItemSuccess,
	genericItemFail,
} = itemsSlice.actions;

export default itemsSlice.reducer;
