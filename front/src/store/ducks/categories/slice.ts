import { createSlice } from "@reduxjs/toolkit";

interface categoriesDataProps {
	id: number;
	name: string;
}

const categoriesSlice = createSlice({
	name: "categories",
	initialState: {
		data: [] as categoriesDataProps[],
		loading: false,
		error: false,
		success: true,
	},
	reducers: {
		getCategoriesRequest: (state) => {
			state.loading = true;
		},
		getCategoriesSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.success = true;
			state.data = action.payload;
		},
		getCategoriesFail: (state) => {
			state.loading = false;
			state.error = true;
			state.success = false;
			state.data = categoriesSlice.getInitialState().data;
		},
	},
});

export const { getCategoriesFail, getCategoriesRequest, getCategoriesSuccess } =
	categoriesSlice.actions;

export default categoriesSlice.reducer;
