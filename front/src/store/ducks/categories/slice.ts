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
		createCategoryRequest: (state, action) => {
			state.loading = true;
		},
		createCategoryFail: (state) => {
			state.loading = false;
			state.error = true;
		},
		createCategorySuccess: (state, action) => {
			state.loading = false;
			state.data = [...state.data, action.payload];
		},
		updateCategoryRequest: (state, action) => {
			state.loading = true;
		},
		updateCategoryFail: (state) => {
			state.loading = false;
			state.error = true;
		},
		updateCategorySuccess: (state, action) => {
			state.loading = false;
			state.data = state.data.map((category) =>
				category.id === action.payload.id ? action.payload : category
			);
		},
	},
});

export const {
	getCategoriesFail,
	getCategoriesRequest,
	getCategoriesSuccess,
	createCategoryFail,
	createCategoryRequest,
	createCategorySuccess,
	updateCategoryFail,
	updateCategoryRequest,
	updateCategorySuccess,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
