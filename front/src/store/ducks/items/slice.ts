import { createSlice } from "@reduxjs/toolkit";
import { itemsDataProps } from "../../../helper/interfaces/Item";

const itemsSlice = createSlice({
	name: "items",
	initialState: {
		data: [] as itemsDataProps[],
		loading: false,
		error: false,
		success: true,
	},
	reducers: {
		getItemsRequest: (state) => {
			state.loading = true;
		},
		getItemsSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.success = true;
			state.data = action.payload;
		},
		getItemsFail: (state) => {
			state.loading = false;
			state.error = true;
			state.success = false;
			state.data = itemsSlice.getInitialState().data;
		},
		createItemRequest: (state, action) => {
			state.loading = true;
		},
		createItemSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.success = true;
			state.data = [...state.data, action.payload];
		},
		createItemFail: (state) => {
			state.loading = true;
			state.error = true;
			state.success = false;
		},
		updateItemRequest: (state, action) => {
			state.loading = true;
		},
		updateItemSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.success = true;

			state.data = state.data.map((item) =>
				item.id === action.payload.id ? action.payload : item
			);
		},
		updateItemFail: (state) => {
			state.loading = false;
			state.error = true;
			state.success = false;
		},
	},
});

export const {
	getItemsFail,
	getItemsRequest,
	getItemsSuccess,
	createItemFail,
	createItemRequest,
	createItemSuccess,
	updateItemFail,
	updateItemRequest,
	updateItemSuccess,
} = itemsSlice.actions;

export default itemsSlice.reducer;
