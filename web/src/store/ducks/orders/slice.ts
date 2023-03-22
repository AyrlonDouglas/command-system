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
	},
});

export const { getOrdersRequest, getOrdersSuccess, ordersFail } = orderSlice.actions;
export default orderSlice.reducer;
