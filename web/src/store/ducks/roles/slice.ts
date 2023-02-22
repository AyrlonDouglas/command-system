import { createSlice } from "@reduxjs/toolkit";
import { PermissionProps } from "../../../helper/interfaces/Permission";
import { rolesDataProps } from "../../../helper/interfaces/Roles";

const rolesSlice = createSlice({
	name: "roles",
	initialState: {
		data: [] as rolesDataProps[],
		loading: false,
		error: false,
		success: true,
		allPermissions: [] as PermissionProps[],
	},
	reducers: {
		getRolesRequest: (state) => {
			state.loading = true;
		},
		getRolesSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.success = true;
			state.data = action.payload;
		},
		getRolesFail: (state) => {
			state.loading = false;
			state.error = true;
			state.success = false;
			state.data = rolesSlice.getInitialState().data;
		},
		getAllPermissionsRequest: (state) => {
			state.loading = true;
		},
		getAllPermissionsSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.success = true;
			state.allPermissions = action.payload;
		},
		getAllPermissionsFail: (state) => {
			state.loading = false;
			state.error = true;
			state.success = false;
			state.allPermissions = rolesSlice.getInitialState().allPermissions;
		},
		createRoleRequest: (state, action) => {
			state.loading = true;
		},
		createRoleSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.success = true;
			state.data = [...state.data, action.payload];
		},
		createRoleFail: (state) => {
			state.loading = false;
			state.success = false;
			state.error = true;
		},
		getRoleByIdRequest: (state, action) => {
			state.loading = true;
		},
		getRoleByIdSuccess: (state, action) => {
			state.loading = false;
			state.error = false;
			state.success = true;
			state.data = [...state.data.filter((el) => el.id !== action.payload.id), action.payload];
		},
		getRoleByIdFail: (state) => {
			state.loading = false;
			state.success = false;
			state.error = true;
		},
	},
});

export const {
	getRolesFail,
	getRolesRequest,
	getRolesSuccess,
	getAllPermissionsFail,
	getAllPermissionsRequest,
	getAllPermissionsSuccess,
	createRoleFail,
	createRoleRequest,
	createRoleSuccess,
	getRoleByIdFail,
	getRoleByIdRequest,
	getRoleByIdSuccess,
} = rolesSlice.actions;

export default rolesSlice.reducer;
