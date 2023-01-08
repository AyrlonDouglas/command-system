import { createSlice } from "@reduxjs/toolkit";

export interface itemsDataProps {
	id: number;
	name: string;
	description: string;
	price: number;
	avaliable: boolean;
	category: {
		id: number;
		name: string;
	};
}

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
		createItemSuccess: (state) => {
			state.loading = false;
			state.error = false;
			state.success = true;
		},
		createItemFail: (state) => {
			state.loading = true;
			state.error = true;
			state.success = false;
		},
		updateItemRequest: (state, action) => {
			state.loading = true;
		},
		updateItemSuccess: (state) => {
			state.loading = false;
			state.error = false;
			state.success = true;
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
