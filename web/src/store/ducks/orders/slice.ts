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
			state.error = null;
		},
		ordersFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		createOrderRequest: (state, action) => {
			state.loading = true;
		},
		createOrderSuccess: (state, action) => {
			state.loading = false;
			state.data.push(action.payload);
			state.error = null;
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		updateOrderRequest: (state, action) => {
			state.loading = true;
		},
		updateOrderSuccess: (state, action) => {
			state.loading = false;
			state.data = [
				...state.data.filter((order) => order.id !== action.payload.id),
				action.payload,
			];
			state.error = null;
		},
	},
});

export const {
	getOrdersRequest,
	getOrdersSuccess,
	ordersFail,
	createOrderRequest,
	createOrderSuccess,
	updateOrderRequest,
	updateOrderSuccess,
} = orderSlice.actions;
export default orderSlice.reducer;
