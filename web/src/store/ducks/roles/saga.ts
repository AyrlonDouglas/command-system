import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { call, put, takeLatest } from "redux-saga/effects";
import { CreateRolesProps } from "../../../helper/interfaces/Roles";
import { api } from "../../../service/axios";
import {
	getRolesFail,
	getRolesSuccess,
	getRolesRequest,
	getAllPermissionsFail,
	getAllPermissionsRequest,
	getAllPermissionsSuccess,
	createRoleFail,
	createRoleRequest,
	createRoleSuccess,
	getRoleByIdFail,
	getRoleByIdRequest,
	getRoleByIdSuccess,
} from "./slice";

function* getRoles() {
	try {
		const response: AxiosResponse = yield call(api.get, "/role");

		yield put(getRolesSuccess(response.data));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível buscar funções");
		}

		yield put(getRolesFail());
	}
}

function* getPermissions() {
	try {
		const response: AxiosResponse = yield call(api.get, "/permission");

		yield put(getAllPermissionsSuccess(response.data));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível buscar permissões");
		}

		yield put(getAllPermissionsFail());
	}
}

function* createRole({ payload }: CreateRolesProps) {
	try {
		const response: AxiosResponse = yield call(api.post, "/role", payload);

		toast.success(`Função ${response.data.name} criada.`);
		redirect("/roles");

		yield put(createRoleSuccess(response.data));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível buscar permissões");
		}

		yield put(createRoleFail());
	}
}

function* getRoleById({ payload }: { type: string; payload: number }) {
	try {
		const response: AxiosResponse = yield call(api.get, `/role/${payload}`);
		yield put(getRoleByIdSuccess(response.data));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível buscar função");
		}

		yield put(getRoleByIdFail());
	}
}

export default function* itemsSaga() {
	yield takeLatest(getRolesRequest().type, getRoles);
	yield takeLatest(getAllPermissionsRequest().type, getPermissions);
	yield takeLatest(createRoleRequest("").type, createRole);
	yield takeLatest(getRoleByIdRequest("").type, getRoleById);
}
