import { createSlice } from "@reduxjs/toolkit";
import { TableDataProps } from "../../../helper/interfaces/Table";

const tablesSlice = createSlice({
	name: "tables",
	initialState: {
		data: [] as TableDataProps[],
		loading: false,
		error: false,
	},
	reducers: {
		getTablesRequest: (state) => {
			state.loading = true;
		},
		getTablesSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.data = action.payload;
		},
		genericTablesFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		createTableRequest: (state, action) => {
			state.loading = true;
		},
		createTableSuccess: (state, action) => {
			state.loading = false;
			state.data = [...state.data, action.payload];
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		updateTableRequest: (state, action) => {
			state.loading = true;
		},
		updateTableSuccess: (state, action) => {
			state.loading = false;
			state.data = [...state.data.filter((el) => el.id !== action.payload.id), action.payload];
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		removeTableRequest: (state, action) => {
			state.loading = true;
		},
		removeTableSuccess: (state, action) => {
			state.loading = false;
			state.data = state.data.filter((el) => el.id !== action.payload);
		},
	},
});

export const {
	genericTablesFail,
	getTablesRequest,
	getTablesSuccess,
	createTableRequest,
	createTableSuccess,
	updateTableRequest,
	updateTableSuccess,
	removeTableRequest,
	removeTableSuccess,
} = tablesSlice.actions;

export default tablesSlice.reducer;
