import { createSlice } from "@reduxjs/toolkit";
import { LoginDataProps } from "../../../helper/interfaces/Login";

export const loginSlice = createSlice({
	name: "login",
	initialState: {
		data: {} as LoginDataProps,
		loading: false,
		error: false,
		success: false,
	},
	reducers: {
		loginRequest: (state, action) => {
			state.loading = true;
		},
		loginSuccess: (state, action) => {
			state.loading = false;
			state.data = {
				employeeCode: action.payload.employeeCode,
				token: action.payload.token,
				employeeId: action.payload.id,
				permissions: action.payload.permissions,
			};
		},
		loginFail: (state) => {
			state.data = loginSlice.getInitialState().data;
			state.loading = false;
			state.error = true;
		},
		recoverLoginRequest: (state) => {
			state.loading = true;
		},
		recoverLoginSuccess: (state, action) => {
			state.loading = false;
			state.success = true;
			state.error = false;
			state.data = {
				...state.data,
				employeeCode: action.payload.employeeCode,
				employeeId: action.payload.id,
				permissions: action.payload.permissions,
			};
		},
	},
});

export const { loginRequest, loginFail, loginSuccess, recoverLoginRequest, recoverLoginSuccess } =
	loginSlice.actions;

export default loginSlice.reducer;
