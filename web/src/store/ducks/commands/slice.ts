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
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		createCommandRequest: (state, action) => {
			state.loading = true;
		},
		createCommandSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.data = [...state.data, action.payload];
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		updateCommandRequest: (state, action) => {
			state.loading = true;
		},
		updateCommandSuccess: (state, action) => {
			state.loading = false;
			state.data = state.data.map((command) =>
				command.id === action.payload.id ? action.payload : command
			);
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		deleteCommandRequest: (state, action) => {
			state.loading = true;
		},
		deleteCommandSuccess: (state, action) => {
			state.loading = false;
			state.data = state.data.filter((command) => command.id !== action.payload.id);
		},
	},
});

export const {
	getCommandsRequest,
	getCommandsSuccess,
	commandFail,
	createCommandRequest,
	createCommandSuccess,
	updateCommandRequest,
	updateCommandSuccess,
	deleteCommandRequest,
	deleteCommandSuccess,
} = commandsSlice.actions;
export default commandsSlice.reducer;
