import { createSlice } from "@reduxjs/toolkit";
import { EmployeeDataProps } from "../../../helper/interfaces/Employee";

const employeesSlice = createSlice({
	name: "employess",
	initialState: {
		data: [] as EmployeeDataProps[],
		loading: false,
		error: false,
		success: true,
	},
	reducers: {
		getEmployeesRequest: (state) => {
			state.loading = true;
		},
		getEmployeesSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.success = true;
			state.data = action.payload;
		},
		getEmployeesFail: (state) => {
			state.loading = false;
			state.error = true;
			state.success = false;
			state.data = employeesSlice.getInitialState().data;
		},
		createEmployeeRequest: (state, action) => {
			state.loading = true;
		},
		createEmployeeSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.success = true;
			state.data = [...state.data, action.payload];
		},
		createEmployeeFail: (state) => {
			state.loading = false;
			state.error = true;
			state.success = false;
		},
		updateEmployeeRequest: (state, action) => {
			state.loading = true;
		},
		updateEmployeeSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.success = true;
			state.data = state.data.map((employee) =>
				employee.id === action.payload.id ? action.payload : employee
			);
		},
		updateEmployeeFail: (state) => {
			state.loading = false;
			state.error = true;
			state.success = false;
		},
	},
});

export const {
	getEmployeesFail,
	getEmployeesRequest,
	getEmployeesSuccess,
	createEmployeeFail,
	createEmployeeRequest,
	createEmployeeSuccess,
	updateEmployeeFail,
	updateEmployeeRequest,
	updateEmployeeSuccess,
} = employeesSlice.actions;

export default employeesSlice.reducer;
