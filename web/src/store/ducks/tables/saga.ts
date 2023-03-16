import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { CreateUpdateTableProps } from "../../../helper/interfaces/Table";
import { api } from "../../../service/axios";
import {
	genericTablesFail,
	getTablesRequest,
	getTablesSuccess,
	createTableRequest,
	createTableSuccess,
	updateTableRequest,
	updateTableSuccess,
	removeTableRequest,
	removeTableSuccess,
} from "./slice";
import { setModalPrimaryOpen } from "../layout/slice";

function* getTables() {
	try {
		const response: AxiosResponse = yield call(api.get, "/table");

		yield put(getTablesSuccess(response.data));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível carregar mesas");
		}

		yield put(genericTablesFail(error));
	}
}
function* createTable({ payload }: CreateUpdateTableProps) {
	try {
		const response: AxiosResponse = yield call(api.post, "/table", payload);

		yield put(setModalPrimaryOpen(false));
		yield put(createTableSuccess(response.data));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível criar mesaa");
		}

		yield put(genericTablesFail(error));
	}
}

function* updateTable({ payload }: CreateUpdateTableProps) {
	try {
		const response: AxiosResponse = yield call(api.patch, `/table/${payload.id}`, payload);

		yield put(setModalPrimaryOpen(false));
		yield put(updateTableSuccess(response.data));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível criar mesaa");
		}

		yield put(genericTablesFail(error));
	}
}

function* removeTable({ payload }: { payload: number; type: string }) {
	try {
		yield call(api.delete, `/table/${payload}`);

		yield put(setModalPrimaryOpen(false));
		yield put(removeTableSuccess(payload));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível remover mesaa");
		}

		yield put(genericTablesFail(error));
	}
}

export default function* tablesSaga() {
	yield takeLatest(getTablesRequest().type, getTables);
	yield takeLatest(createTableRequest("").type, createTable);
	yield takeLatest(updateTableRequest("").type, updateTable);
	yield takeLatest(removeTableRequest("").type, removeTable);
}
