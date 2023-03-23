import { createSlice } from "@reduxjs/toolkit";
import { OrderDataProps } from "../../../helper/interfaces/Order";

export const orderSlice = createSlice({
	name: "orders",
	initialState: {
		data: [] as OrderDataProps[],
		loading: false,
		error: null,
	},
	reducers: {
		getOrdersRequest: (state) => {
			state.loading = true;
		},
		getOrdersSuccess: (state, action) => {
			state.loading = false;
			state.data = action.payload;
		},
		ordersFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		createOrderRequest: (state, action) => {
			state.loading = true;
		},
		createOrderSuccess: (state, action) => {
			state.loading = false;
			state.data.push(action.payload);
		},
	},
});

export const {
	getOrdersRequest,
	getOrdersSuccess,
	ordersFail,
	createOrderRequest,
	createOrderSuccess,
} = orderSlice.actions;
export default orderSlice.reducer;
