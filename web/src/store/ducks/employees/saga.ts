import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { routesApp } from "../../../helper/constants/routes";
import { ChangePassProps, CreateOrUpdateEmployeeProps } from "../../../helper/interfaces/Employee";
import { navigateSetter } from "../../../routes/NavigateSetter";
import { api } from "../../../service/axios";
import {
	getEmployeesRequest,
	getEmployeesSuccess,
	createEmployeeRequest,
	createEmployeeSuccess,
	updateEmployeeRequest,
	updateEmployeeSuccess,
	genericEmployeeFail,
	updateEmployeePassRequest,
	updateEmployeePassSuccess,
} from "./slice";

function* getEmployees() {
	try {
		const response: AxiosResponse = yield call(api.get, "/employee");
		yield put(getEmployeesSuccess(response.data));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível buscar profissionais");
		}

		yield put(genericEmployeeFail());
	}
}

function* createEmployee({ payload }: CreateOrUpdateEmployeeProps) {
	try {
		const response: AxiosResponse = yield call(api.post, "/employee", payload);

		yield put(createEmployeeSuccess(response.data));
		toast.success(`Colaborador ${response.data.firstName} ${response.data.lastName} criado!`);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível criar colaborador");
		}

		yield put(genericEmployeeFail());
	}
}

function* updateEmployee({ payload }: CreateOrUpdateEmployeeProps) {
	try {
		const id = payload.id;

		delete payload.id;
		const response: AxiosResponse = yield call(api.patch, `/employee/${id}`, payload);

		yield put(updateEmployeeSuccess(response.data));
		toast.success(`Colaborador ${payload.firstName} ${payload.lastName} atualizado!`);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível editar item");
		}

		yield put(genericEmployeeFail());
	}
}

function* changePass({ payload }: ChangePassProps) {
	try {
		delete payload.newPassConfirm;

		yield call(api.patch, "/employee/changePass", payload);

		toast.success("Senha alterada");

		navigateSetter(routesApp.settings.account);

		yield put(updateEmployeePassSuccess());
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível trocar senha");
		}
		yield put(genericEmployeeFail());
	}
}

export default function* itemsSaga() {
	yield takeLatest(getEmployeesRequest().type, getEmployees);
	yield takeLatest(createEmployeeRequest("").type, createEmployee);
	yield takeLatest(updateEmployeeRequest("").type, updateEmployee);
	yield takeLatest(updateEmployeePassRequest("").type, changePass);
}
