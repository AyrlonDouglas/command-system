import { createSlice } from "@reduxjs/toolkit";
import { CategoriesDataProps } from "../../../helper/interfaces/Category";

const categoriesSlice = createSlice({
	name: "categories",
	initialState: {
		data: [] as CategoriesDataProps[],
		loading: false,
		error: false,
	},
	reducers: {
		getCategoriesRequest: (state) => {
			state.loading = true;
		},
		getCategoriesSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.data = action.payload;
		},
		createCategoryRequest: (state, action) => {
			state.loading = true;
		},
		createCategorySuccess: (state, action) => {
			state.loading = false;
			state.data = [...state.data, action.payload];
		},
		updateCategoryRequest: (state, action) => {
			state.loading = true;
		},
		updateCategorySuccess: (state, action) => {
			state.loading = false;
			state.data = state.data.map((category) =>
				category.id === action.payload.id ? action.payload : category
			);
		},
		genericCategoryFail: (state) => {
			state.loading = false;
			state.error = true;
		},
	},
});

export const {
	getCategoriesRequest,
	getCategoriesSuccess,
	createCategoryRequest,
	createCategorySuccess,
	updateCategoryRequest,
	updateCategorySuccess,
	genericCategoryFail,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
