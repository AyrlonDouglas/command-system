import { createSlice } from "@reduxjs/toolkit";
import { EmployeeDataProps } from "../../../helper/interfaces/Employee";

const employeesSlice = createSlice({
	name: "employess",
	initialState: {
		data: [] as EmployeeDataProps[],
		loading: false,
		error: false,
	},
	reducers: {
		getEmployeesRequest: (state) => {
			state.loading = true;
		},
		getEmployeesSuccess: (state, action) => {
			state.loading = false;
			state.error = false;

			state.data = action.payload;
		},
		createEmployeeRequest: (state, action) => {
			state.loading = true;
		},
		createEmployeeSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.data = [...state.data, action.payload];
		},
		updateEmployeeRequest: (state, action) => {
			state.loading = true;
		},
		updateEmployeeSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.data = state.data.map((employee) =>
				employee.id === action.payload.id ? action.payload : employee
			);
		},
		genericEmployeeFail: (state) => {
			state.loading = false;
			state.error = true;
		},
	},
});

export const {
	getEmployeesRequest,
	getEmployeesSuccess,
	createEmployeeRequest,
	createEmployeeSuccess,
	updateEmployeeRequest,
	updateEmployeeSuccess,
	genericEmployeeFail,
} = employeesSlice.actions;

export default employeesSlice.reducer;
