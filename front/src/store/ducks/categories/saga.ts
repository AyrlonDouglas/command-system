import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../../service/axios";
import { getCategoriesFail, getCategoriesRequest, getCategoriesSuccess } from "./slice";

function* getCategories() {
	try {
		const response: AxiosResponse = yield call(api.get, "/category");

		yield put(getCategoriesSuccess(response.data));
	} catch (error: unknown) {
		toast.error("Não foi possível buscar categories");

		yield put(getCategoriesFail());
	}
}

export default function* itemsSaga() {
	yield takeLatest(getCategoriesRequest().type, getCategories);
}
