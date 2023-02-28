import { createSlice } from "@reduxjs/toolkit";
import { CommandDataProps } from "../../../helper/interfaces/Commands";

const commandsSlice = createSlice({
	name: "commands",
	initialState: {
		data: [] as CommandDataProps[],
		loading: false,
		error: false,
	},
	reducers: {
		getCommandsRequest: (state) => {
			state.loading = true;
		},
		getCommandsSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.data = action.payload;
		},
		commandFail: (state) => {
			state.loading = false;
			state.error = true;
		},
		createCommandRequest: (state, action) => {
			state.loading = true;
		},
		createCommandSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.data = [...state.data, action.payload];
		},
	},
});

export const {
	getCommandsRequest,
	getCommandsSuccess,
	commandFail,
	createCommandRequest,
	createCommandSuccess,
} = commandsSlice.actions;
export default commandsSlice.reducer;
