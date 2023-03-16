import { createSlice } from "@reduxjs/toolkit";
import { PermissionProps } from "../../../helper/interfaces/Permission";
import { RolesDataProps } from "../../../helper/interfaces/Roles";

const rolesSlice = createSlice({
	name: "roles",
	initialState: {
		data: [] as RolesDataProps[],
		loading: false,
		error: false,
		allPermissions: [] as PermissionProps[],
	},
	reducers: {
		getRolesRequest: (state) => {
			state.loading = true;
		},
		getRolesSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.data = action.payload;
		},
		getAllPermissionsRequest: (state) => {
			state.loading = true;
		},
		getAllPermissionsSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.allPermissions = action.payload;
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		createRoleRequest: (state, action) => {
			state.loading = true;
		},
		createRoleSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.data = [...state.data, action.payload];
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		getRoleByIdRequest: (state, action) => {
			state.loading = true;
		},
		getRoleByIdSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.data = [...state.data.filter((el) => el.id !== action.payload.id), action.payload];
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		updateRoleRequest: (state, action) => {
			state.loading = true;
		},
		updateRoleSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.data = [...state.data.filter((el) => el.id !== action.payload.id), action.payload];
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		removeRoleRequest: (state, action) => {
			state.loading = true;
		},
		removeRoleSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.data = state.data.filter((role) => role.name !== action.payload.name);
		},
		genericRoleFail: (state) => {
			state.loading = false;
			state.error = true;
		},
	},
});

export const {
	getRolesRequest,
	getRolesSuccess,
	getAllPermissionsRequest,
	getAllPermissionsSuccess,
	createRoleRequest,
	createRoleSuccess,
	getRoleByIdRequest,
	getRoleByIdSuccess,
	updateRoleRequest,
	updateRoleSuccess,
	removeRoleRequest,
	removeRoleSuccess,
	genericRoleFail,
} = rolesSlice.actions;

export default rolesSlice.reducer;
