import { createSlice } from "@reduxjs/toolkit";
import { loginDataProps } from "../../../helper/interfaces/Login";

export const loginSlice = createSlice({
	name: "login",
	initialState: {
		data: {} as loginDataProps,
		loading: false,
		error: false,
		success: false,
		userCreated: false,
	},
	reducers: {
		loginRequest: (state, action) => {
			state.loading = true;
			state.userCreated = false;
		},
		loginSuccess: (state, action) => {
			state.loading = false;
			state.userCreated = false;

			state.data = {
				employeeCode: action.payload.employeeCode,
				token: action.payload.token,
				employeeId: action.payload.id,
			};
		},
		loginFail: (state) => {
			state.data = loginSlice.getInitialState().data;
			state.loading = false;
			state.error = true;
		},
	},
});

export const { loginRequest, loginFail, loginSuccess } = loginSlice.actions;

export default loginSlice.reducer;
