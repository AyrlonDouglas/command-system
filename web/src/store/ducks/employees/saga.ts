import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { createOrUpdateEmployeeProps } from "../../../helper/interfaces/Employee";
import { api } from "../../../service/axios";
import {
	getEmployeesFail,
	getEmployeesRequest,
	getEmployeesSuccess,
	createEmployeeFail,
	createEmployeeRequest,
	createEmployeeSuccess,
	updateEmployeeFail,
	updateEmployeeRequest,
	updateEmployeeSuccess,
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

		yield put(getEmployeesFail());
	}
}

function* createEmployee({ payload }: createOrUpdateEmployeeProps) {
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

		yield put(createEmployeeFail());
	}
}

function* updateEmployee({ payload }: createOrUpdateEmployeeProps) {
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

		yield put(updateEmployeeFail());
	}
}

export default function* itemsSaga() {
	yield takeLatest(getEmployeesRequest().type, getEmployees);
	yield takeLatest(createEmployeeRequest("").type, createEmployee);
	yield takeLatest(updateEmployeeRequest("").type, updateEmployee);
}
